package com.lombard.app;

import com.lombard.app.Repositorys.FilialRepository;
import com.lombard.app.Repositorys.Lombard.LoanRepo;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Loan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.function.Consumer;

import static com.lombard.app.StaticData.activeLoans;

@SpringBootApplication
public class PawnappApplication implements CommandLineRunner {

	static ApplicationContext ctx;
	public static void main(String[] args) {

		ctx = SpringApplication.run(PawnappApplication.class, args);
	}


	@Autowired
	private LoanRepo loanRepo;
	@Autowired
	private FilialRepository filialRepo;
	@Override
	public void run(String... args) throws Exception {

	}
}
