package hu.porkolab.miserere.service;

import mainModel.Player;
import mainModel.SuperFoe;

import java.util.List;

public interface FightService {
    public List<String> fight(Player player, SuperFoe enemy);
    public List<String> getHarcUzenet();
}
