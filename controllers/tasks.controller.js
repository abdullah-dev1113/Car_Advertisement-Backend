const task = require("../Models/tasks.model");
const priority = require("../Models/Priority.model");
const status = require("../Models/Statuses.model");
const user = require("../Models/Users.model")

class taskhandler {
    constructor() { }

    async getAll(req, res) {
        try {
            const found = await task.find();
            if (!found) return res.status(404).json({ msg: "task is not found" });
            return res.status(200).json({ "found": found });
        } catch (error) {
            console.log("getall task error:" , error);
            
            return res.status(500).json({ "error fetching problem": error });
        }
    };

    async GetById(req, res) {
        try {
            const id = req.params.id;
            const found = await task.findById(id).populate("CreatedBy", "name contact")
  .populate("Status", "name")
  .populate("Priority", "name");
            if (!found || found == null) return res.status(404).json({ msg: "task id is not found" });
            return res.status(200).json({ "found": found });
        } catch (error) {
            return res.status(500).json({ "error fetching problem": error });
        }
    };


    async create(req, res) {
        try {
            const {name , price , description , features , startsOn , endsOn , category , cityArea ,image , status, priority, progress  } = req.body;
            console.log(req.body);
            
            const added = await task.create({
                "Title": name,"Description": description ,"Price" : price , "Features":features ,"StartsOn": startsOn ,"EndsOn": endsOn ,"Category": category ,"cityArea": cityArea ,"image": image , "Status": status, "priority": priority, "Progress": progress,  CreatedBy: req.user?._id || null
            });
            console.log(added)
            if (!added) return res.status(404).json({ msg: "task is not craeted" });
            return res.status(200).json({ 
                success: true,
                msg:"Task created successfully",
                "created": added 
            });
        } catch (error) {
            return res.status(500).json({ "error creating pronlem": error });
        }
    };


    async update(req, res) {
        try {
            const id = req.params.id;
            const { title ,price , description , features , startsOn , endsOn , category , cityArea , image ,progress, type } = req.body;
            const updated = await task.findByIdAndUpdate(id, { "Title": title, "Price" : price , "Description" : description , "Features" : features , "StartsOn" : startsOn , "EndsOn" : endsOn , "Category" : category , cityArea , image , "Progress": progress, type  } , {new : true});
            if (!updated) return res.status(404).json({ msg: "task is not updated" });
            return res.status(200).json({ "updated": updated });
        } catch (error) {
            return res.status(500).json({ "error updating problem": error.message });
        }
    };

    async search(req, res) {
  try {
    const { keyword, category, cityArea } = req.query;
    const query = {};

    if (keyword) query.Title = { $regex: keyword, $options: "i" };
    if (category) query.Category = category;
    if (cityArea) query.cityArea = cityArea;

    const found = await task.find(query);
    return res.status(200).json({ found });
  } catch (error) {
    return res.status(500).json({ msg: "Search error", error });
  }
}


    async deleteTask(req, res) {
        try {
            const id = req.params.id;
            const { title, status, detail, Progress, priority } = req.body;
            const deleted = await task.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ msg: "task is not deleted" });
            return res.status(200).json({ "delete": deleted });
        } catch (error) {
            return res.status(500).json({ "error deleting problem": error.message });
        }
    };
}

const taskHandler = new taskhandler();
module.exports = taskHandler;