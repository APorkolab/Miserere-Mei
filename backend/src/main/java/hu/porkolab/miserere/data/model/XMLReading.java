package hu.porkolab.miserere.data.model;

import mainModel.Place;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Hashtable;
import java.util.List;

public class XMLReading {

    private Hashtable<String, Place> places;

    {
        try {
            places = beolvasas();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Hashtable<String, Place> beolvasas() throws IOException {


        URL url = XMLReading.class.getClassLoader().getResource("local.xml");
        File forrasFile = null;
        try {
            forrasFile = new File(url.toURI());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        Hashtable<String, Place> places = new Hashtable<>();
        SAXBuilder jdomBuilder = new SAXBuilder();
        try {
            Document jdomDocument = jdomBuilder.build(forrasFile);
            Element jdomRoot = jdomDocument.getRootElement();
            List<Element> childrens;
            childrens = jdomRoot.getChildren();
            for (int i = 0; i < childrens.size(); i++) {
                Element child = childrens.get(i);
                int size = child.getChildren().size();
                Place p = new Place();
                p.setLocation(child.getChild("location").getText());
                p.setNarrationZoneText(child.getChild("narrationZoneText").getText());
                p.setOpponentName(child.getChild("opponentName").getText());
                p.setDecision1(child.getChild("decision1").getText());
                p.setDecision2(child.getChild("decision2").getText());
                p.setDecision3(child.getChild("decision3").getText());
                p.setDecision4(child.getChild("decision4").getText());
                p.setSceneArtFilename(child.getChild("sceneArtFilename").getText());
                p.setFurtherLocation1(child.getChild("furtherLocation1").getText());
                p.setFurtherLocation2(child.getChild("furtherLocation2").getText());
                p.setFurtherLocation3(child.getChild("furtherLocation3").getText());
                p.setFurtherLocation4(child.getChild("furtherLocation4").getText());
                places.put(p.getLocation(), p);
            }
        } catch (JDOMException je) {
            System.err.println(je.getMessage());
        }
        System.out.println("places = " + places.size());
        return places;
    }

    public Hashtable<String, Place> getPlaces() {
        return places;
    }

    public void setPlaces(Hashtable<String, Place> places) {
        this.places = places;
    }

}