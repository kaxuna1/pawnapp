package com.lombard.app.models.Lombard.ReturnedCombinedModels;



import com.lombard.app.models.Lombard.ItemClasses.Laptop;
import com.lombard.app.models.Lombard.ItemClasses.MobilePhone;

import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
public class ReturnCombinedModel {
    private List<MobilePhone> mobilePhones;
    private List<Laptop> laptops;

    public ReturnCombinedModel(List<MobilePhone> mobilePhones, List<Laptop> laptops) {
        this.mobilePhones = mobilePhones;
        this.laptops = laptops;
    }

    public List<MobilePhone> getMobilePhones() {
        return mobilePhones;
    }

    public void setMobilePhones(List<MobilePhone> mobilePhones) {
        this.mobilePhones = mobilePhones;
    }

    public List<Laptop> getLaptops() {
        return laptops;
    }

    public void setLaptops(List<Laptop> laptops) {
        this.laptops = laptops;
    }
}
