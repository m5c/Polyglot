package eu.kartoffelquadrat.polyglot;

/**
 * Input form data when a new card is created. No id or box involved.
 */
public class CardStub {

    // French text of the vocabulary card
    private String french;

    // German text of the vocabulary card
    private String german;

    public String getFrench() {
        return french;
    }

    public void setFrench(String french) {
        this.french = french;
    }

    public String getGerman() {
        return german;
    }

    public void setGerman(String german) {
        this.german = german;
    }
}
