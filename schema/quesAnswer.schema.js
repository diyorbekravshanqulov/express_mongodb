const { Schema, model } = require("mongoose");

const quesAnswerSchema = new Schema(
  {
    question: { 
        type: String, 
        required: true, 
    },
    answer: { 
        type: String, 
        required: true, 
    },
    create_data: { 
        type: Date, 
    },
    update_data: { 
        type: Date, 
        default: Date.now 
    },
    is_checked: { 
        type: Boolean, 
        default: false 
    },
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: "user" 
    },
    expert_id: { type: Schema.Types.ObjectId, 
        ref: "auth" 
    },
  },
  { versionKey: false }
);

module.exports = model("QuesAnswer", quesAnswerSchema);
