package eu.kartoffelquadrat.polyglot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Launcher class for the Polyglot REST Backend, standalone mode (no application server required).
 * Use "docker-compose up" To auto invoke the maven profile that uses this launcher.
 *
 * @Author Maximilian Schiedermeier, Github: kartoffelquadrat
 */
@SpringBootApplication
public class PolyglotBoot {

    public static void main(String[] args) {
        SpringApplication.run(PolyglotBoot.class, args);
        System.out.println("Polyglot up and running: http://localhost:8444/polyglot");
    }
}
