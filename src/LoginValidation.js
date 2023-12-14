function Validation(values){

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let error = {};

  if(values.email ===''){
    error.email = "Email should not be empty";
  }
  else if(!email_pattern.test(values.email)){
    error.email = "Email did not match";
  }else{
    error.email="";
  }

  if(values.password_pattern ===""){
    error.password = "password can not be empty";
  } 
  else if(!password_pattern.test(values.password)){
    error.password = "password did not match";
  }
  else{
    error.password= "";
  }

  return error;
  
}
export default Validation;