const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
    name: { type: String, required: true },
    img: { type: String },
    user: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
    hospital: { required: true, type: Schema.Types.ObjectId, ref: 'Hospital' }
});

medicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', medicoSchema);