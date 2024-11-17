import DepartmentService from "../services/department.services";

class departmentController {
    async addDepartment(req,res) {
        try{
            let  id = req.body.id
            let description = req.body.description
            let departmentName = req.body.departmentName
          
            let department = await DepartmentService.addDepartment(id , description, departmentName)
            res.status(200).json(department);
            }
            catch(e){
                res.status(404).json({ message: e.message });
            }
    }

    async listDepartments () {
       let department = await DepartmentService.listDepartment()
       return department
    }



}

export default departmentController;