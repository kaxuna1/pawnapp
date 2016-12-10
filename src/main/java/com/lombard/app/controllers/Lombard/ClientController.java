package com.lombard.app.controllers.Lombard;


import com.lombard.app.Functions.StaticFunctions;
import com.lombard.app.Repositorys.Lombard.ClientsRepo;
import com.lombard.app.Repositorys.SessionRepository;
import com.lombard.app.models.Enum.JsonReturnCodes;
import com.lombard.app.models.Enum.UserType;
import com.lombard.app.models.JsonMessage;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes;
import com.lombard.app.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by kaxa on 11/17/16.
 */
@Controller
public class ClientController {

    @ResponseBody
    @RequestMapping("/createClient")
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "name", required = true, defaultValue = "") String name,
                              @RequestParam(value = "surname", required = true, defaultValue = "") String surname,
                              @RequestParam(value = "pn", required = true, defaultValue = "") String pn,
                              @RequestParam(value = "mobile", required = true, defaultValue = "") String mobile) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() &&
                (session.getUser().getType() == UserType.lombardOperator.getCODE()
                        || session.getUser().getType() == UserType.lombardManager.getCODE())) {
            List<Client> clientList = clientsRepo.findByPersonalNumberAndFilial(pn, session.getUser().getFilial());
            if (clientList.size() > 0) {
                return new JsonMessage(JsonReturnCodes.USEREXISTS.getCODE(), "კლიენტი ასეთი პირადი ნომრით უკვე არსებობს");
            }

            try {
                if (StaticFunctions.checkValueNotEmpty(name, surname, pn, mobile)) {
                    Client client = new Client(name, surname, pn, mobile, session.getUser().getFilial());
                    clientsRepo.save(client);

                } else {
                    return new JsonMessage(JsonReturnCodes.LOGICERROR.getCODE(), "არასწორი პარამეტრებია გადმოცემული");
                }


            } catch (Exception e) {
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), e.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "კლიენტი შეიქმნა წარმატებით");


        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }


    }

    @RequestMapping("/getClients")
    @ResponseBody
    public Page<Client> getClients(@CookieValue("projectSessionId") long sessionId,
                                   int index,
                                   String search,
                                   boolean flagged) {
        Session session = sessionRepository.findOne(sessionId);
        List<Integer> statuses = new ArrayList<>();
        if (flagged) {
            statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
            statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
            return clientsRepo.findByFlaged(search,
                    statuses,
                    session.getUser().getFilial(),
                    constructPageSpecification(index));
        } else {
            return clientsRepo.findForClientsPage(search,session.getUser().getFilial(),constructPageSpecification(index));
        }
    }


    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 30);
        return pageSpecification;
    }

    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    ClientsRepo clientsRepo;
}



