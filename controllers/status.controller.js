const Statuses = require("../Models/Statuses.model");

class statusHandler {
    constructor() { }

    async createStatus(req, res) {
        try {
            console.log("body received:" , req.body);
            
            // const id = req.params.id;
            const { name, icon , color } = req.body;
            if (!name) {
                console.log("name is undefined or empty!");
                
            }
            console.log("name value:" , name);
            
            const added = await Statuses.create({ name: req.body.name ,icon: req.body.icon ,color: req.body.color });
            if (!added) return res.status(404).json({ msg: "status is not created" });
            return res.status(200).json({ "created": added });
        } catch (error) {
            console.log("error caught:" , error);
            
            return res.status(500).json({ "error creating problem": error.message });
        }
    };


    async updateStatus(req, res) {
        try {
            const id = req.params.id;
            const { name, icon } = req.body;
            const updated = await Statuses.findByIdAndUpdate(id, { name,  icon }, { new: true });
            if (!updated) return res.status(404).json({ msg: "status is not created" });
            return res.status(200).json({ "update": updated });
        } catch (error) {
            return res.status(500).json({ "error fetching problem": error });
        }
    };

    async deleteStatus(req, res) {
        try {
            const id = req.params.id;
            const { name, icon } = req.body;
            const deleted = await Statuses.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ msg: "status is not deleted" });
            return res.status(200).json({ "delete": deleted });
        } catch (error) {
            return res.status(500).json({ "error deleting problem": error });
        }
    };


    async getAll(req, res) {
        try {
            const found = await Statuses.find();
            if (!found) return res.status(404).json({ msg: "status is not found" });
            return res.status(200).json({ "Found": found });
        } catch (error) {
            return res.status(500).json({ "error getting problem": error.message });
        }
    };

    async getById(req, res) {
        try {
            const id = req.params.id;
            const found = await Statuses.findById(id);
            if (!found) return res.status(404).json({ msg: "status is not found" });
            return res.status(200).json({ "getbyid": found });
        } catch (error) {
            return res.status(500).json({ "error getbyid problem": error.message });
        }
    };
}

const status = new statusHandler();
module.exports = status;