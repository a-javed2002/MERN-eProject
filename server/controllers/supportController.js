import Support from '../models/Support.js';

// Create a new support request
export const createSupportRequest = async (req, res) => {
    try {
        const supportRequest = new Support(req.body);
        await supportRequest.save();
        res.status(201).send(supportRequest);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a support request by ID
export const getSupportRequest = async (req, res) => {
    try {
        const supportRequest = await Support.findById(req.params.id);
        if (!supportRequest) {
            return res.status(404).send();
        }
        res.send(supportRequest);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a support request by ID
export const updateSupportRequest = async (req, res) => {
    try {
        const supportRequest = await Support.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!supportRequest) {
            return res.status(404).send();
        }
        res.send(supportRequest);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a support request by ID
export const deleteSupportRequest = async (req, res) => {
    try {
        const supportRequest = await Support.findByIdAndDelete(req.params.id);
        if (!supportRequest) {
            return res.status(404).send();
        }
        res.send(supportRequest);
    } catch (error) {
        res.status(500).send(error);
    }
};
