package com.lombard.app.models.UserManagement;



import javax.persistence.*;
import java.util.Date;

/**
 * Created by KGelashvili on 10/26/2015.
 */
@Entity
@Table(name = "sessions")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sessionId")
    private long id;

    @Column
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column
    private boolean isactive;

    public Session(Date createDate,User user){

        this.createDate = createDate;
        this.user=user;
        this.isactive=true;
    }
    public Session(){

    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public boolean isIsactive() {
        return isactive;
    }

    public void setIsactive(boolean isactive) {
        this.isactive = isactive;
    }
}
