import Text from "../models/Text.js";
import User from "../models/User.js"; // User 모델도 가져옵니다.
import Comment from "../models/Comment.js";
export const registerText = async (req, res) => {
  const { id, data } = req.body; // id: 일반 사용자 아이디, data: 글의 데이터

  const { title, content } = data;

  try {
    const author = await User.findOne({ id }); // 'id' 필드로 사용자 검색
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // 새로운 글을 만듭니다.
    const newText = new Text({
      title,
      content,
      author: author._id, // 찾은 사용자의 ObjectId를 author로 저장
      createdAt: Date.now(),
    });

    // MongoDB에 글 저장
    await newText.save();

    res.status(201).json({
      message: "Text successfully registered",
      text: newText,
    });
  } catch (error) {
    console.error("Error registering text:", error);
    res.status(500).json({ message: "Failed to register text", error });
  }
};

export const getTexts = async (req, res) => {
  try {
    // 모든 텍스트와 관련된 author 정보를 함께 조회합니다.
    const texts = await Text.find()
      .populate("author", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(texts);
  } catch (error) {
    console.error("Error fetching texts:", error);
    res.status(500).json({ message: "Failed to fetch texts", error });
  }
};

export const deleteTexts = async (req, res) => {
  const { postId } = req.params;
  try {
    const texts = await Text.findByIdAndDelete(postId);
    if (!texts) {
      return res.status(404).json({ message: "Text not found" });
    }
    return res.status(200).json({ message: "포스트가 삭제되었습니다" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch texts", error });
  }
};
export const getLatestTexts = async (req, res) => {
  try {
    const texts = await Text.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(texts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch texts", error });
  }
};

export const registerComment = async (req, res) => {
  try {
    // req.params에서 postId 추출
    const { postId } = req.params;
    const { content, userId } = req.body; // req.body에서 댓글 내용 추출

    // 1. postId로 해당 게시글을 찾기
    const post = await Text.findById(postId);
    const user = await User.findOne({ id: userId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 2. 새로운 댓글 생성
    const newComment = new Comment({
      content,
      author: user._id, // 인증된 사용자의 ID를 댓글 작성자로 설정 (req.user는 미들웨어에서 사용자 인증 후 설정된다고 가정)
      post: post._id,
    });

    // 3. 댓글 저장
    await newComment.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to register comment" });
  }
};
export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params; // URL에서 postId를 가져옴
  const page = parseInt(req.query.page) || 1; // 기본값은 1
  const limit = parseInt(req.query.limit) || 10; // 기본값은 10
  const skip = (page - 1) * limit;

  try {
    // 해당 postId에 대한 전체 댓글 수를 가져옴
    const totalComments = await Comment.countDocuments({ post: postId });

    // 댓글을 페이지네이션 방식으로 가져옴
    const comments = await Comment.find({ post: postId })
      .populate("author", "name id")
      .skip(skip) // 페이지네이션을 위한 skip
      .limit(limit) // 페이지 당 가져올 댓글 수
      .sort({ createdAt: 1 });

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalComments / limit);

    res.status(200).json({
      comments,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const deleteComments = async (req, res) => {
  const { commentId } = req.params;
  try {
    const deleteComment = await Comment.findByIdAndDelete(commentId);

    if (!deleteComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "에러 ", error });
  }
};
