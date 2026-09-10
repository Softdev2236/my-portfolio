import mongoose from 'mongoose';

const SkillSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
    }
)

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);