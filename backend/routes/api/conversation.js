const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult } = require("express-validator");

const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

// @route   POST api/conversation/:id
// @desc    Create a conversation
// @access  Private

router.post("/:id", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const conversation = await Conversation.find({
      documentId: req.params.id,
    });
    const user = await User.findById(req.user.id);

    let finalConversation;

    if (conversation.length > 0) {
      console.log("Conversation updated");

      let message = {
        sender: user.role,
        message: text,
      };
      conversation[0].messages.push(message);
      finalConversation = await conversation[0].save();
    } else {
      console.log("Conversation created");
      let message = {
        sender: user.role,
        message: text,
      };
      const newConversation = {
        sender: req.user.id,
        documentId: req.params.id,
        messages: message,
      };
      const convo = new Conversation(newConversation);
      finalConversation = await convo.save();
    }

    res.status(200).json(finalConversation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/conversation/:id
// @desc    Get conversation of current document
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const conversation = await Conversation.find({ documentId: req.params.id });
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/conversation/:id
// @desc    Delete the conversation
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      documentId: req.params.id,
    });
    console.log(conversation);
    if (!conversation) {
      return res.status(404).json({ msg: "Conversation not found" });
    }

    await conversation.deleteOne();

    res.status(200).json({ msg: "Conversation removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Conversation not found" });
    }
    res.status(500).send("Server Error");
  }
});

/* // @route   POST api/tasks/:id
// @desc    Update the task
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { completed } = req.body;

  try {
    const task = await Document.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.completed = completed;

    task.completed_at = completed ? Date.now() : "";

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});
 */
module.exports = router;
