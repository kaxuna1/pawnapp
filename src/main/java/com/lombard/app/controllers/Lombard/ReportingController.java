package com.lombard.app.controllers.Lombard;

import com.lombard.app.Repositorys.Lombard.*;
import com.lombard.app.Repositorys.SessionRepository;
import com.lombard.app.Services.Service1;
import com.lombard.app.StaticData;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes;
import com.lombard.app.models.UserManagement.Session;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.lombard.app.StaticData.*;

/**
 * Created by kakha on 1/11/2017.
 */
@Controller
public class ReportingController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private LoanMovementsRepo loanMovementsRepo;
    @Autowired
    private LoanConditionsRepo loanConditionsRepo;
    @Autowired
    private LoanInterestRepo loanInterestRepo;
    @Autowired
    private Service1 service1;
    @Autowired
    private LaptopBrandRepo laptopBrandRepo;
    @Autowired
    private LaptopRepo laptopRepo;
    @Autowired
    private BrandRepo brandRepo;
    @Autowired
    private UzrunvelyofaRepo uzrunvelyofaRepo;
    @Autowired
    private SinjiRepo sinjiRepo;
    @Autowired
    private UzrunvelyofaInterestRepo uzrunvelyofaInterestRepo;

    @RequestMapping("/loansReport")
    @ResponseBody
    public void getLoansReport(@CookieValue("projectSessionId") long sessionId,
                               @RequestParam(value = "index", required = true, defaultValue = "0") int index,
                               @RequestParam(value = "search", required = true, defaultValue = "") String search,
                               @RequestParam(value = "closed", required = true, defaultValue = "false") boolean closed,
                               @RequestParam(value = "opened", required = true, defaultValue = "false") boolean opened,
                               @RequestParam(value = "late", required = true, defaultValue = "false") boolean late,
                               @RequestParam(value = "start", required = true, defaultValue = "false") long start,
                               @RequestParam(value = "end", required = true, defaultValue = "false") long end,
                               HttpServletResponse response) {


        Session session = sessionRepository.findOne(sessionId);
        List<Integer> statuses = new ArrayList<>();
        if (!closed && !opened) {
            if (!late) {
                statuses.add(LoanStatusTypes.CLOSED_WITH_SUCCESS.getCODE());
                statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
                statuses.add(LoanStatusTypes.ACTIVE.getCODE());

            } else {
                statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
                statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
            }
        }
        if (opened) {
            if (!late)
                statuses.add(LoanStatusTypes.ACTIVE.getCODE());
            else
                statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
        }
        if (closed) {
            if (!late)
                statuses.add(LoanStatusTypes.CLOSED_WITH_SUCCESS.getCODE());
            else
                statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
        }
        List<Loan> data = null;
        if (!search.isEmpty()) {
            data = loanRepo.findMyFilialLoansWithSearchList(search, session.getUser().getFilial(),
                    statuses, new Date(start), new DateTime(new Date(end)).plusDays(1).toDate());
        } else {
            data = loanRepo.findMyFilialLoansList(session.getUser().getFilial(), statuses,
                    new Date(start), new DateTime(new Date(end)).plusDays(1).toDate());
        }

        response.setContentType("application/excel");
        response.setHeader("filename", "report.xls");
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("FirstSheet");
        response.setHeader("Content-disposition", "attachment; filename=MosataniReport.xls");
        HSSFRow rowHead = sheet.createRow((short) 0);
        rowHead.createCell(0).setCellValue("ნომერი");
        rowHead.createCell(1).setCellValue("კლიენტი");
        rowHead.createCell(2).setCellValue("გაცემული თანხა");
        rowHead.createCell(3).setCellValue("დარჩენილი ძირი");
        rowHead.createCell(4).setCellValue("დარიცხული პროცენტი");
        rowHead.createCell(5).setCellValue("გადასახდელი პროცენტი");
        rowHead.createCell(6).setCellValue("გადახდები");
        rowHead.createCell(7).setCellValue("გაცემის თარიღი");
        rowHead.createCell(8).setCellValue("მომდევნო გადახდა");
        rowHead.createCell(9).setCellValue("კლიენტის პ/ნ");
        rowHead.createCell(10).setCellValue("ტელეფონი");
        rowHead.createCell(11).setCellValue("სესხის გამცემი");

        int rowNum = 1;
        for (Loan l :
                data) {

            HSSFRow row = sheet.createRow((short) (rowNum));
            row.createCell(0).setCellValue(l.getNumber());
            row.createCell(1).setCellValue(l.getClientFullName());
            row.createCell(2).setCellValue(l.getLoanSum());
            row.createCell(3).setCellValue(l.getLeftSum());
            row.createCell(4).setCellValue(l.getInterestAddedSum());
            row.createCell(5).setCellValue(l.getInterestSumLeft());
            row.createCell(6).setCellValue(l.getPayementsMadeSum());
            row.createCell(7).setCellValue(dateFormat.format(l.getCreateDate()));
            row.createCell(8).setCellValue((l.isClosed()?"დახურულია":
                    (l.getNextInterestCalculationDate()==null?"":
                            dateFormat.format(l.getNextInterestCalculationDate()))));
            row.createCell(9).setCellValue(l.getClient().getPersonalNumber());
            row.createCell(10).setCellValue(l.getClient().getMobile());
            row.createCell(11).setCellValue(l.getUserFullName());

            rowNum++;
        }
        for(int i=0;i<workbook.getNumberOfSheets();i++){
            for(int f=0;f<8;f++){
                workbook.getSheetAt(i).autoSizeColumn(f);
            }
        }


        try {
            workbook.write(response.getOutputStream());
            response.flushBuffer();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    private Pageable constructPageSpecification(int pageIndex, int size) {
        return new PageRequest(pageIndex, size);
    }
}
