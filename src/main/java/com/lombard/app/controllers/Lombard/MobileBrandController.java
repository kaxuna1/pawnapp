package com.lombard.app.controllers.Lombard;


import com.lombard.app.Repositorys.Lombard.LaptopBrandRepo;
import com.lombard.app.Repositorys.Lombard.MobileBrandRepo;
import com.lombard.app.models.Lombard.Dictionary.LaptopBrand;
import com.lombard.app.models.Lombard.Dictionary.MobileBrand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class MobileBrandController {

    @ResponseBody
    @RequestMapping("/getbrends")
    public List<MobileBrand> get(){
        return mobileBrandRepo.findAll();
    }
    @ResponseBody
    @RequestMapping("/getlaptopbrends")
    public List<LaptopBrand> getLaptopBrands(){
        return laptopBrandRepo.findByActive(true);
    }


    @Autowired
    private LaptopBrandRepo laptopBrandRepo;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
}
