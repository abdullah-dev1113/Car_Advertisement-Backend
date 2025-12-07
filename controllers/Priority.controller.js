const pirority = require("../Models/Priority.model");

class priorityHandler {
    constructor() { }

    async findPriority(req, res) {
        try {
            const found = await pirority.find();
            if (!found || found == null) return res.status(404).json({ msg: "priority is not found" });
            return res.status(200).json({ "Found": found });
        } catch (error) {
            return res.status(500).json({ "error handling problem": error });
        }
    };

    async GetpriorityById(req, res) {
        try {
            const id = req.params.id;
            const found = await pirority.findById(id);
            if (!found || found == null) return res.status(404).json({ msg: "priority id is not found" });
            return res.status(200).json({ "Found": found });
        } catch (error) {
            return res.status(500).json({ "error priority problem": error });
        }
    };


    async createPriority(req, res) {
        try {
            const { name, icon, color } = req.body;
            const added = await pirority.create({ name, icon, color });
            if (!added) return res.status(404).json({ msg: "priority is not added" });
            return res.status(200).json({ "created": added });
        } catch (error) {
            return res.status(500).json({ "error fetching problem": error });
        }
    };

    async updatepriority(req, res) {
        try {
            const id = req.params.id;
            const { name, icon, color } = req.body;
            const updated = await pirority.findByIdAndUpdate(id, { name, icon, color }, { new: true });

            if (!updated) return res.status(404).json({ msg: "priority is not updated" });
            return res.status(200).json({ "updated": updated });
        } catch (error) {
            return res.status(500).json({ "error updating problem": error });
        }
    };

    async deletepriority(req, res) {
        try {
            const id = req.params.id;
            const deleted = await pirority.findByIdAndDelete(id);

            if (!deleted) return res.status(404).json({ msg: "priority is not deleted" });
            return res.status(200).json({ "deleted": deleted });
        } catch (error) {
            return res.status(500).json({ "error deleting problem": error.message });
        }
    };


}


const priority = new priorityHandler();
module.exports = priority;