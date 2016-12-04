package com.lombard.app.models.UserManagement;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Loan;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {


    public static boolean jsonIgnoreBids;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userId")
	private long id;
    @NotNull
    @Column
	private String username;
    @Column
    @NotNull
    @JsonIgnore
	private String password;
    @Column
    @NotNull
    private String email;
    @Column
    @NotNull
    private String name;
    @Column
    @NotNull
    private String surname;
    @Column
    private String address;
    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;
    @Column
    private String mobile;
    @Column
    @NotNull
    private String personalNumber;
    @Column
    @NotNull
    private int type;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Session> sessions;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Loan> loen;


    public User(long id){
        this.id=id;
    }
    public User(){
    }


    public User(String username,
                String password,
                String email,
                String name,
                String surname,
                String address,
                Filial filial,
                String mobile,
                String personalNumber,
                int type,
                List<Session> sessions){
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.filial = filial;
        this.mobile = mobile;
        this.personalNumber = personalNumber;
        this.type = type;
        this.sessions = sessions;
        this.loen=new ArrayList<>();
    }


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

    public long getId() {
        return id;
    }

    public void setId() { this.id=id;}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPersonalNumber() {
        return personalNumber;
    }

    public void setPersonalNumber(String personalNumber) {
        this.personalNumber = personalNumber;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

    public String getFilialName(){
        return filial.getName();
    }

    public String getNameSurname(){
        return this.name+" "+this.surname;
    }

    public List<Loan> getLoen() {
        return loen;
    }

    public void setLoen(List<Loan> loen) {
        this.loen = loen;
    }
}
