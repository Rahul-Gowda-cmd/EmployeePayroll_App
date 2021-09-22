class EmployeePayrollData {
    get id() {
      return this._id;
    }
    set id(id) {
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
  
    get profilePic() {
      return this._profilePic;
    }
    set profilePic(profilePic) {
      this._profilePic = profilePic;
    }
  
    get gender() {
      return this._gender;
    }
    set gender(gender) {
      this._gender = gender;
    }
  
    get department() {
      return this._department;
    }
    set department(department) {
      this._department = department;
    }
  
    get salary() {
      return this._salary;
    }
    set salary(salary) {
      this._salary = salary;
    }
  
    get note() {
      return this._note;
    }
    set note(note) {
      this._note = note;
    }
  
    get startDate() {
      return this._startDate;
    }

    set startDate(startDate) {
        let currentDate = new Date();
        if (startDate > currentDate) {
          throw "Starting date is a future date";
        }
        var diff = Math.abs(currentDate.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30) {
          throw "Starting date is beyond 30 days";
        }
        this._startDate = startDate;
      }
    
  
    toString() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
      return "\nID = " + this.id + ", \nName = " + this.name + ", \nGender = " +
        this.gender + ", \nProfile URL = " + this.profilePic
        + ", \nDepartment = " + this.department + ", \nSalary = "
        + this.salary + ", \nStart Date = " + empDate + ", \nNote = " + this.note;
    }
  }