const role = require("../Models/roles.model");

class rolehandler {
    constructor() { }

    async getAll(req, res) {
        try {
            const Found = await role.find();
            if (!Found || Found == null) return res.status(404).json({ msg: `Role is not found` })
            return res.status(200).json({ "getAll": Found });
        } catch (error) {
            return res.status(500).json({ "Not Found": error.message });
        }
    };


    async GetById(req, res) {
        try {
            const id = req.params.id;
            const found = await role.findById(id);
            if (!found || found == null) return res.status(404).json({ msg: `id${id} is not found` });
            return res.status(200).json({ "found": found });
        } catch (error) {
            return res.status(500).json({ "error fetching role": error.message });
        }
    };

    async CreateRole(req, res) {
        try {
            const { Name, rank } = req.body;
            const added = await role.create({ "Name": Name, "rank": rank });
            if (!added) return res.status(404).json({ msg: "role is not added" });
            return res.status(200).json({
                "Added": added
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ "eror adding role ": error.message });
        }
    };

    async UpdateRole(req, res) {
        try {
            const id = req.params.id;
            const { name, rank } = req.body;
            const updated = await role.findByIdAndUpdate(id, { "Name": name, "Rank": rank });
            if (!updated) return res.status(404).json({ msg: "Role is not updated" });
            return res.status(200).json({ "update": updated });
        } catch (error) {
            return res.status(500).json({ "error updating problem": error.message });
        }
    };

    async Deleted(req, res) {
        try {
            const id = req.params.id;
            const { Name, rank } = req.body;
            const Deleted = await role.findByIdAndDelete(id, { "Name": Name, "rank": rank });
            if (!Deleted) return res.status(404).json({ msg: "Role is not deleted" });
            return res.status(200).json({ "delete": Deleted });
        } catch (error) {
            return res.status(500).json({ "error deleting problem": error });
        }

    }
}

const roleHandler = new rolehandler();
module.exports = roleHandler;