package com.lombard.app.controllers.Lombard;


import com.lombard.app.Repositorys.Lombard.MobileBrandRepo;
import com.lombard.app.Repositorys.Lombard.MobileModelRepo;
import com.lombard.app.models.Lombard.Dictionary.MobileModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class MobileModelController {
    @ResponseBody
    @RequestMapping("/getMobileModels")
    public List<MobileModel> get(){
        return mobileModelRepo.findAll();
    }
   /* @ResponseBody
    @RequestMapping("/getMobileBrandModels/{id}")
    public List<MobileModel> getBrandModels(@PathVariable("id") long id){


        return mobileBrandRepo.findOne(id).getMobileModels();
    }*/



    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private MobileModelRepo mobileModelRepo;
}
