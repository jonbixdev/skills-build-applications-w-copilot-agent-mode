import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const upsertOptions = { upsert: true, returnDocument: 'after', runValidators: true } as const;

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userRecords = [
      { displayName: 'Maya Chen', email: 'maya.chen@example.com', username: 'mayachen' },
      { displayName: 'Andre Rivera', email: 'andre.rivera@example.com', username: 'andrerivera' },
      { displayName: 'Priya Nair', email: 'priya.nair@example.com', username: 'priyanair' },
      { displayName: 'Jordan Brooks', email: 'jordan.brooks@example.com', username: 'jordanbrooks' },
    ];

    const users = await Promise.all(
      userRecords.map((user) =>
        User.findOneAndUpdate({ username: user.username }, { $set: user }, upsertOptions),
      ),
    );

    const teamRecords = [
      { name: 'Sunrise Striders', memberIds: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', memberIds: [users[2]._id, users[3]._id] },
    ];

    const teams = await Promise.all(
      teamRecords.map((team) =>
        Team.findOneAndUpdate({ name: team.name }, { $set: team }, upsertOptions),
      ),
    );

    const activityRecords = [
      { userIndex: 0, activityType: 'Run', durationMinutes: 32, distanceKm: 5.2, caloriesBurned: 340, completedAt: '2026-09-24T07:15:00.000Z' },
      { userIndex: 0, activityType: 'Strength training', durationMinutes: 45, caloriesBurned: 280, completedAt: '2026-09-26T08:00:00.000Z' },
      { userIndex: 1, activityType: 'Cycle', durationMinutes: 50, distanceKm: 18.4, caloriesBurned: 460, completedAt: '2026-09-25T17:30:00.000Z' },
      { userIndex: 1, activityType: 'Run', durationMinutes: 28, distanceKm: 4.1, caloriesBurned: 290, completedAt: '2026-09-27T07:45:00.000Z' },
      { userIndex: 2, activityType: 'Hike', durationMinutes: 75, distanceKm: 6.8, caloriesBurned: 510, completedAt: '2026-09-23T09:00:00.000Z' },
      { userIndex: 2, activityType: 'Yoga', durationMinutes: 40, caloriesBurned: 150, completedAt: '2026-09-26T10:30:00.000Z' },
      { userIndex: 3, activityType: 'Run', durationMinutes: 36, distanceKm: 5.7, caloriesBurned: 375, completedAt: '2026-09-25T06:50:00.000Z' },
      { userIndex: 3, activityType: 'Strength training', durationMinutes: 38, caloriesBurned: 245, completedAt: '2026-09-27T11:00:00.000Z' },
    ];

    await Promise.all(
      activityRecords.map(({ userIndex, ...activity }) => {
        const record = {
          ...activity,
          userId: users[userIndex]._id,
          completedAt: new Date(activity.completedAt),
        };

        return Activity.findOneAndUpdate(
          { userId: record.userId, activityType: record.activityType, completedAt: record.completedAt },
          { $set: record },
          upsertOptions,
        );
      }),
    );

    const leaderboardRecords = [
      { userId: users[0]._id, teamId: teams[0]._id, points: 460, period: '2026-09' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 385, period: '2026-09' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 520, period: '2026-09' },
      { userId: users[3]._id, teamId: teams[1]._id, points: 310, period: '2026-09' },
    ];

    await Promise.all(
      leaderboardRecords.map((entry) =>
        LeaderboardEntry.findOneAndUpdate(
          { userId: entry.userId, period: entry.period },
          { $set: entry },
          upsertOptions,
        ),
      ),
    );

    const workoutRecords = [
      { name: 'Easy 5K Run', description: 'A relaxed conversational-pace run.', difficulty: 'beginner', durationMinutes: 35 },
      { name: 'Hill Intervals', description: 'Short uphill efforts with an easy walk back.', difficulty: 'intermediate', durationMinutes: 30 },
      { name: 'Full-body Strength', description: 'A balanced session with bodyweight and dumbbell movements.', difficulty: 'intermediate', durationMinutes: 40 },
      { name: 'Recovery Yoga', description: 'Gentle mobility and stretching for recovery days.', difficulty: 'beginner', durationMinutes: 25 },
    ];

    await Promise.all(
      workoutRecords.map((workout) =>
        Workout.findOneAndUpdate({ name: workout.name }, { $set: workout }, upsertOptions),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
