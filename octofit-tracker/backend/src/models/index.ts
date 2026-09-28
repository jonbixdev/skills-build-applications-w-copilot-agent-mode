import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    username: { type: String, trim: true, unique: true, sparse: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, min: 0 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, default: 0 },
    period: { type: String, trim: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, min: 0 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema, 'users');
export const Team = model('Team', teamSchema, 'teams');
export const Activity = model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout = model('Workout', workoutSchema, 'workouts');