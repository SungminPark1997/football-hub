import Text from "../models/Text.js";
import User from "../models/User.js"; // User 모델도 가져옵니다.

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
    const texts = await Text.find().populate("author", "name email");

    res.status(200).json(texts);
  } catch (error) {
    console.error("Error fetching texts:", error);
    res.status(500).json({ message: "Failed to fetch texts", error });
  }
};
