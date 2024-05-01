class EmailGenerator {
    static generateRandomEmail() {
      return `testinguser${Math.floor(Math.random() * 100000)}@yopmail.com`;
    }
  }
  
  export default EmailGenerator;