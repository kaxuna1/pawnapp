package com.lombard.app.models.Lombard;


import com.lombard.app.models.Filial;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.util.List;

/**
 * Created by kaxa on 12/12/16.
 */
@StaticMetamodel(Loan.class)
public class Loan_ {
    public static volatile SingularAttribute<Loan, Long> id;
    public static volatile SingularAttribute<Loan, Filial> filial;
    public static volatile SingularAttribute<Loan, Client> client;
    public static volatile SingularAttribute<Loan, Boolean> isActive;
    public static volatile SingularAttribute<Loan, List<LoanPayment>> payments;
    public static volatile SingularAttribute<Loan, List<LoanInterest>> loanInterests;
}
