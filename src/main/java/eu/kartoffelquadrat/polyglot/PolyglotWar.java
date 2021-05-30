package eu.kartoffelquadrat.polyglot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Launcher class for the Polyglot REST Backend, WAR deployment.
 * Deployment in WAR mode requires an application server and a manual DB configuration. See README.md for details.
 *
 * @Author Maximilian Schiedermeier, Github: kartoffelquadrat
 */
@SpringBootApplication
public class PolyglotWar extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(PolyglotBoot.class, args);
        System.out.println("Polyglot started in WAR mode. Check application server for deployment details.");
    }
}
