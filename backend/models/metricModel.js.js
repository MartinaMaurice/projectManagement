const mongoose = require('mongoose');

const metricSchema = mongoose.Schema(
    {
        totalExamSessions: { type: Number, required: true },
        availableSlots: { type: Number, required: true },
        numberOfTrainingCenters: { type: Number, required: true },
        upcomingExams: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;
