package com.lombard.app.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.StaticData;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Dictionary.LoanCondition;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import com.lombard.app.models.Lombard.TypeEnums.LoanConditionPeryodType;
import com.lombard.app.models.Lombard.TypeEnums.LoanPaymentType;
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes;
import com.lombard.app.models.Lombard.TypeEnums.MovementTypes;
import com.lombard.app.models.UserManagement.User;
import org.joda.time.DateTime;
import rx.Observable;
import rx.functions.Action1;
import rx.functions.Func1;

import javax.persistence.*;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;


/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "Loans", indexes = {
        @Index(name = "clientIndex", columnList = "clientId", unique = false),
        @Index(name = "loanNumberIndex", columnList = "number", unique = false),
        @Index(name = "isActiveIndex", columnList = "isActive", unique = false)

})
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "clientId")
    private Client client;


    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Uzrunvelyofa> uzrunvelyofas;


    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanMovement> movements;
    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<LoanPayment> payments;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanInterest> loanInterests;

    @Column
    private Date nextInterestCalculationDate;

    @Column
    private String number;


    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;

    @ManyToOne
    @JoinColumn(name = "loanConditionId")
    private LoanCondition loanCondition;

    @Column
    private float loanSum;


    @Column
    private boolean isActive;

    @Column
    private Date createDate;

    @Column
    private Date lastModifyDate;

    @Column
    private boolean onFirstInterest;

    @Column
    private boolean closed;

    @Column
    private Date closeDate;

    @Column
    private int status;


    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    public Loan(Client client, Filial filial, float loanSum, User user) {
        this.loanInterests = new ArrayList<>();
        this.client = client;
        this.filial = filial;
        this.loanSum = loanSum;
        this.isActive = true;
        this.createDate = new Date();
        this.lastModifyDate = new Date();
        this.user = user;
        this.movements = new ArrayList<>();
        this.payments = new ArrayList<>();
        this.onFirstInterest = true;
        this.closed = false;
        this.uzrunvelyofas=new ArrayList<>();
    }

    public Loan() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public float getLoanSum() {
        return loanSum;
    }

    public void setLoanSum(float loanSum) {
        this.loanSum = loanSum;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<LoanMovement> getMovements() {
        return movements;
    }

    public void setMovements(List<LoanMovement> movements) {
        this.movements = movements;
    }

    public List<LoanPayment> getPayments() {
        return payments;
    }

    public void setPayments(List<LoanPayment> payments) {
        this.payments = payments;
    }

    public float getLeftSum() {
        final float[] tempSum = {this.loanSum};
        payments.forEach(loanPayment -> {
            if (loanPayment.isActive()) {
                if (loanPayment.getType() == LoanPaymentType.PARTIAL.getCODE()) {
                    tempSum[0] -= loanPayment.getSum();
                }
            }
        });
        return tempSum[0]>=0?tempSum[0]:0;
    }

    public float getInterestSum() {
        return (this.getLeftSum() / 100) * this.loanCondition.getPercent();
    }

    public LoanCondition getLoanCondition() {
        return loanCondition;
    }

    public void setLoanCondition(LoanCondition loanCondition) {
        this.loanCondition = loanCondition;
    }

    public List<LoanInterest> getLoanInterests() {
        return loanInterests;
    }

    public void setLoanInterests(List<LoanInterest> loanInterests) {
        this.loanInterests = loanInterests;
    }

    public Date getNextInterestCalculationDate() {
        if (!this.isClosed())
            return nextInterestCalculationDate;
        else
            return null;
    }

    public void setNextInterestCalculationDate(Date nextInterestCalculationDate) {
        this.nextInterestCalculationDate = nextInterestCalculationDate;
    }

    public float getInterestSumLeft() {
        final float[] val = {0};
        Observable.from(loanInterests).filter(new Func1<LoanInterest, Boolean>() {
            @Override
            public Boolean call(LoanInterest loanInterest) {
                return !loanInterest.isPayed();
            }
        }).subscribe(new Action1<LoanInterest>() {
            @Override
            public void call(LoanInterest loanInterest) {
                val[0] += loanInterest.getLeftToPay();
            }
        });
        return val[0];
    }

    public void recalculateInterestPayments() {

        List<LoanInterest> loanInterestsLocal = new ArrayList<>();

        Observable.from(loanInterests).filter(loanInterest -> !loanInterest.isPayed()).filter(loanInterest -> !loanInterest.isPayed()).subscribe(loanInterest -> {

            Observable.from(payments).filter(loanPayment -> !loanPayment.isUsedFully()).subscribe(loanPayment -> {
                if (!loanInterest.isPayed()) {
                    if (loanPayment.getLeftForUse() < loanInterest.getLeftToPay()) {
                        loanInterest.addToPayedSum(loanPayment.getLeftForUse());
                        loanPayment.setUsedSum(loanPayment.getSum());
                        loanPayment.setUsedFully(true);

                    } else {
                        if (loanPayment.getLeftForUse() > loanInterest.getLeftToPay()) {
                            loanPayment.addToUsedSum(loanInterest.getLeftToPay());
                            loanInterest.addToPayedSum(loanInterest.getLeftToPay());
                            loanInterest.setPayed(true);
                        } else {
                            loanPayment.setUsedSum(loanPayment.getSum());
                            loanPayment.setUsedFully(true);
                            loanInterest.setPayedSum(loanInterest.getSum());
                        }
                    }

                }
            });
            //loanInterest.setPayedSum(loanInterest.getSum()-leftToPayForThisInterest[0]);
            loanInterest.checkIfIsPayed();
        });

        this.checkStatus();
        this.tryClosingLoan();
    }

    private void checkStatus() {
       if(getOverdueInterests().size()>0){
           this.setStatus(LoanStatusTypes.PAYMENT_LATE.getCODE());
       }else{
           this.setStatus(LoanStatusTypes.ACTIVE.getCODE());
       }
    }

    public void addInterest() {

        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            this.nextInterestCalculationDate = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            this.nextInterestCalculationDate = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            this.nextInterestCalculationDate = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.onFirstInterest)
            this.nextInterestCalculationDate = new DateTime(this.nextInterestCalculationDate).minusDays(1).toDate();

        if(this.loanCondition.PercentLogical(this.isOnFirstInterest())>0) {
            LoanInterest loanInterest=                    new LoanInterest(this,
                    ((getLeftSum() / 100) * this.loanCondition.PercentLogical(this.isOnFirstInterest())),
                    this.loanCondition.PercentLogical(isOnFirstInterest()), this.nextInterestCalculationDate);
            this.loanInterests.add(loanInterest);
        }
        this.onFirstInterest = false;

        this.recalculateInterestPayments();
    }

    public void addFirstInterest() {
        Date date = new Date();
        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            date = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            date = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            date = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.getLoanCondition().getFirstDayPercent() > 0) {

            float sum = ((getLeftSum() / 100) * this.loanCondition.getFirstDayPercent());
            LoanInterest loanInterest = new LoanInterest(this,
                    sum,
                    this.loanCondition.getFirstDayPercent(), date);
            this.loanInterests.add(loanInterest);
            this.movements.add(new LoanMovement("დაეკისრა პროცენტი "
                    + sum + "ლარი"
                    , MovementTypes.LOAN_INTEREST_GENERATED.getCODE(), this));
        }
        if (this.getLoanCondition().getPercent() == this.getLoanCondition().getFirstDayPercent()) {
            this.nextInterestCalculationDate = date;
        } else {
            this.nextInterestCalculationDate = new DateTime().plusDays(1).toDate();
        }

        this.recalculateInterestPayments();
    }

    public float getSumForLoanClose() {
        return this.getLeftSum() + this.getInterestSumLeft();
    }

    public boolean isOnFirstInterest() {
        return onFirstInterest;
    }

    public void setOnFirstInterest(boolean onFirstInterest) {
        this.onFirstInterest = onFirstInterest;
    }


    public String getClientFullName() {
        return this.client.getName() + " " + this.client.getSurname();
    }

    public String getClientPN() {
        return this.client.getPersonalNumber();
    }

    public String getClientMobile() {
        return this.client.getMobile();
    }

    public String getUserFullName() {
        return this.user.getName() + " " + this.user.getSurname();
    }

    public String getUserPN() {
        return this.user.getPersonalNumber();
    }

    public String getConditionName() {
        return this.loanCondition.getName();
    }

    public String getConditionFullName() {
        return this.loanCondition.getFullname();
    }

    public long getClientId() {
        return client.getId();
    }

    public void makePaymentForClosing(Float sum) {
        if (sum == this.getSumForLoanClose()) {
            float sumForUse = sum;
            if (this.getInterestSumLeft() > 0) {
                sumForUse -= this.getInterestSumLeft();
                LoanPayment loanPayment = new LoanPayment(this, this.getInterestSumLeft(), LoanPaymentType.PERCENT.getCODE());
                this.getPayments().add(loanPayment);
                LoanMovement loanMovement = new LoanMovement("პროცენტის გადახდა", MovementTypes.LOAN_PAYMENT_MADE_PERCENT.getCODE(), this);
                this.movements.add(loanMovement);
            }
            LoanPayment loanPaymentPartial = new LoanPayment(this, sumForUse, LoanPaymentType.PARTIAL.getCODE());
            loanPaymentPartial.setUsedFully(true);
            loanPaymentPartial.setUsedSum(loanPaymentPartial.getSum());
            this.getPayments().add(loanPaymentPartial);
            LoanMovement loanMovement2 = new LoanMovement("ძირის დაფარვა", MovementTypes.LOAN_PAYMENT_MADE_PARTIAL.getCODE(), this);
            this.movements.add(loanMovement2);
            this.recalculateInterestPayments();
        } else {
            if (sum < this.getSumForLoanClose()) {
                float leftForPayment = sum - getInterestSumLeft();
                if (this.getInterestSumLeft() > 0) {
                    this.makePayment(sum > this.getInterestSumLeft() ?
                            this.getInterestSumLeft() : sum, LoanPaymentType.PERCENT.getCODE());
                    this.movements.add(new LoanMovement("პროცენტის გადახდა",
                            MovementTypes.LOAN_PAYMENT_MADE_PERCENT.getCODE(), this));
                }
                if ((leftForPayment) > 0) {
                    this.makePayment(leftForPayment, LoanPaymentType.PARTIAL.getCODE());
                    this.movements.add(new LoanMovement("ძირის გადახდა",
                            MovementTypes.LOAN_PAYMENT_MADE_PARTIAL.getCODE(), this));
                }
            }

        }
    }

    private void tryClosingLoan() {
        if (this.getSumForLoanClose() <= 0 && !this.isClosed()) {
            LoanMovement loanMovement = new LoanMovement("სესხი დაიხურა წარმატებით.", MovementTypes.LOAN_CLOSED.getCODE(), this);
            this.movements.add(loanMovement);
            this.closed = true;
            //this.uzrunvelyofas.forEach(Uzrunvelyofa::free);
            this.status= LoanStatusTypes.CLOSED_WITH_SUCCESS.getCODE();
            this.closeDate = new Date();
        }
    }

    public void makePayment(float sum, int paymentType) {

        this.payments.add(new LoanPayment(this, sum, paymentType));
        int movementType = (paymentType == LoanPaymentType.FULL.getCODE() ? MovementTypes.LOAN_PAYMENT_MADE_FULL.getCODE() :
                (paymentType == LoanPaymentType.PARTIAL.getCODE() ? MovementTypes.LOAN_PAYMENT_MADE_PARTIAL.getCODE() :
                        MovementTypes.LOAN_PAYMENT_MADE_PERCENT.getCODE()));
        String movementText = (paymentType == LoanPaymentType.FULL.getCODE() ? "სესხის სრულიად დაფარვა" :
                (paymentType == LoanPaymentType.PARTIAL.getCODE() ? "სესხის ნაწილობრივი დაფარვა" :
                        "პროცენტის გადახდა"));
        this.movements.add(new LoanMovement(movementText, movementType, this));
        this.recalculateInterestPayments();
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public Date getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(Date closeDate) {
        this.closeDate = closeDate;
    }

    public boolean isOverdue() {

        //TODO ახალი ლოგიკა დაგვიანებულის დასადგენად LN3AB9716
        DateTime dateTime = new DateTime();
        DateTime dateTime1 = new DateTime();
        final boolean[] overdue = {false};
        dateTime.toLocalDateTime().toLocalDate().isAfter(dateTime1.toLocalDateTime().toLocalDate());
        if (this.closed)
            return false;
        Observable.from(loanInterests).filter(loanInterest -> !loanInterest.isPayed() && (new DateTime().toLocalDateTime().toLocalDate().
                isAfter(new DateTime(loanInterest.getDueDate().getTime()).toLocalDateTime().toLocalDate()))).subscribe(loanInterest -> {
            overdue[0] = true;
        });

        return overdue[0];
    }

    public Date getNextPaymentDate() {
        Optional<LoanInterest> loanInterestOptional=loanInterests.stream().filter(loanInterest -> !loanInterest.isPayed())
                .min(Comparator.comparing(LoanInterest::getDueDate));
        if(loanInterestOptional.isPresent()){
            return loanInterestOptional.get().getDueDate();
        }
        return null;
    }

    public void confiscateAndCloseLoan(){
        LoanMovement loanMovement = new LoanMovement("სესხი დაიხურა ნივთების კონფიკაციით.", MovementTypes.LOAN_CLOSED.getCODE(), this);
        this.movements.add(loanMovement);
        this.closed = true;
        this.status= LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE();
        this.closeDate = new Date();
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<Uzrunvelyofa> getUzrunvelyofas() {
        return uzrunvelyofas;
    }

    public void setUzrunvelyofas(List<Uzrunvelyofa> uzrunvelyofas) {
        this.uzrunvelyofas = uzrunvelyofas;
    }

    public List<Integer> getLoanUzrunvelyofaTypes(){
        return this.uzrunvelyofas.stream().map(Uzrunvelyofa::getType).distinct().sorted().collect(Collectors.toList());
    }

    public List<LoanInterest> getOverdueInterests(){
        DateTime dateTime=new DateTime();
        Calendar cal= Calendar.getInstance();
        cal.setTime(new Date());
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Tbilisi"));
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return loanInterests.stream()
                .filter(loanInterest1 -> loanInterest1.isActive())
                .filter(loanInterest2 -> !loanInterest2.isPayed())
                .filter(loanInterest3 -> loanInterest3.getDueDate().before(cal.getTime()))
                .collect(Collectors.toList());
    }
}
