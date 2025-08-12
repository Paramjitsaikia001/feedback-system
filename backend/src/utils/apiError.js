class ApiError extends Error {
    constructor(
        statuscode,
        message= "something is wrong",
        errors,
        stack

    ){
        super(message)

        this.statuscode=statuscode,
        this.message=message,
        this.errors=errors,
        this.stack=stack,
        this.success=false,
        this.data =null


        if(stack){
    this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }

}

export default ApiError;