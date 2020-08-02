package eu.kartoffelquadrat.polyglot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Launcher class for the Polyglot REST Backend.
 * mySQL container must be powered up before launching the backend:
 * ->   docker start bgpData
 *
 * @Author Maximilian Schiedermeier, Github: kartoffelquadrat
 */
@SpringBootApplication
public class Polyglot {

    public static void main(String[] args) {
        SpringApplication.run(Polyglot.class, args);
    }
}
