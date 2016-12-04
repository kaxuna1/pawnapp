package com.lombard.app.models;

import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.ItemClasses.MobilePhone;

import java.util.List;

/**
 * Created by kaxa on 11/22/16.
 */
public class LoanCreateModel {
    private Client client;
    private List<MobilePhone> mobiles;
    public LoanCreateModel(){}

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<MobilePhone> getMobiles() {
        return mobiles;
    }

    public void setMobiles(List<MobilePhone> mobiles) {
        this.mobiles = mobiles;
    }
}
