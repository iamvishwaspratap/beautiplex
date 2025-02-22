package com.parlour.booking.Response;

public class CustomResponse<C> {
    public C obj;
    public String custommsg;
    CustomResponse(){

    }
    public CustomResponse(C obj, String custommsg){
        this.obj=obj;
        this.custommsg=custommsg;
    }
}
