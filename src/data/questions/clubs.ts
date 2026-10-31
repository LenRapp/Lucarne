import { VF, make } from './make';

const q = make('clubs');

export const CLUBS = [
  // ----------------------------- FACILE -----------------------------
  q('facile', 'qcm', 'Dans quelle ville joue le club de Liverpool ?', ['Liverpool', 'Manchester', 'Londres', 'Leeds'], 0, 'Son stade, Anfield, est l’un des plus célèbres d’Angleterre.'),
  q('facile', 'qcm', 'Quel est le stade du FC Barcelone ?', ['Le Camp Nou', 'Le Santiago-Bernabéu', 'Le Metropolitano', 'San Mamés'], 0, 'Longtemps le plus grand stade d’Europe.'),
  q('facile', 'qcm', 'Quel club est surnommé « les Reds » en Angleterre ?', ['Liverpool', 'Chelsea', 'Everton', 'Manchester City'], 0, 'En raison de son maillot entièrement rouge.'),
  q('facile', 'vrai-faux', 'Le derby de Manchester oppose United et City.', VF, 0, 'Les deux clubs de la ville, séparés par quelques kilomètres.'),
  q('facile', 'qcm', 'Quel club joue au Parc des Princes ?', ['Paris Saint-Germain', 'Olympique de Marseille', 'AS Monaco', 'Lille'], 0, 'Dans le seizième arrondissement de Paris.'),
  q('facile', 'qcm', 'Quelle est la couleur historique du maillot de la Juventus ?', ['Rayé noir et blanc', 'Tout en rouge', 'Bleu ciel', 'Vert et blanc'], 0, 'D’où son surnom de « Vieille Dame » en zébré.'),
  q('facile', 'qcm', 'Quel club italien joue à San Siro avec l’Inter ?', ['Milan AC', 'Juventus', 'AS Rome', 'Naples'], 0, 'Le stade porte deux noms selon le club qui reçoit.'),
  q('facile', 'devine', 'Club allemand le plus titré, il évolue à l’Allianz Arena.', ['Bayern Munich', 'Borussia Dortmund', 'Schalke 04', 'Hambourg'], 0, 'Plus de trente titres de champion d’Allemagne.'),
  q('facile', 'qcm', 'Quel club français est surnommé « l’OM » ?', ['Olympique de Marseille', 'Olympique lyonnais', 'Montpellier', 'Metz'], 0, 'Fondé en 1899, champion d’Europe en 1993.'),
  q('facile', 'vrai-faux', 'Le Real Madrid et l’Atlético de Madrid viennent de la même ville.', VF, 0, 'Leur derby est l’un des plus chauds d’Espagne.'),
  q('facile', 'qcm', 'Quel club néerlandais est célèbre pour son centre de formation ?', ['Ajax Amsterdam', 'Feyenoord', 'PSV Eindhoven', 'AZ Alkmaar'], 0, 'Il a formé Cruyff, Bergkamp, Kluivert, De Jong et bien d’autres.'),
  q('facile', 'qcm', 'Quel club écossais partage le derby de Glasgow avec le Celtic ?', ['Rangers', 'Aberdeen', 'Hearts', 'Hibernian'], 0, 'L’Old Firm, l’un des derbys les plus anciens du monde.'),
  q('facile', 'qcm', 'De quelle ville vient le club de Naples ?', ['Naples', 'Rome', 'Turin', 'Florence'], 0, 'Le club de Maradona dans les années 1980.'),
  q('facile', 'devine', 'Club anglais de Londres dont le stade s’appelle Stamford Bridge.', ['Chelsea', 'Arsenal', 'Tottenham', 'West Ham'], 0, 'Vainqueur de la Ligue des champions en 2012 et 2021.'),
  q('facile', 'qcm', 'Quel club français a remporté sept titres de champion de France consécutifs entre 2002 et 2008 ?', ['Olympique lyonnais', 'Paris Saint-Germain', 'AS Monaco', 'Bordeaux'], 0, 'Une série inédite en Ligue 1.'),
  q('facile', 'vrai-faux', 'Le FC Porto est un club portugais.', VF, 0, 'Avec Benfica et le Sporting, l’un des trois grands du pays.'),
  q('facile', 'qcm', 'Quel club argentin a formé Diego Maradona ?', ['Argentinos Juniors', 'Boca Juniors', 'River Plate', 'Racing'], 0, 'Il y débute à quinze ans avant de rejoindre Boca.'),

  // ------------------------------ MOYEN ------------------------------
  q('moyen', 'qcm', 'Quel club a réalisé le triplé championnat, coupe et Ligue des champions en 1999 ?', ['Manchester United', 'Bayern Munich', 'Barcelone', 'Milan AC'], 0, 'Sous la direction de Sir Alex Ferguson.'),
  q('moyen', 'qcm', 'Quel club espagnol a réalisé le sextuplé en 2009 ?', ['Barcelone', 'Real Madrid', 'Valence', 'Séville'], 0, 'Six trophées en une année civile, sous Guardiola.'),
  q('moyen', 'devine', 'Club italien surnommé « les Bianconeri », basé à Turin.', ['Juventus', 'Torino', 'Milan AC', 'Atalanta'], 0, 'Le club le plus titré du championnat italien.'),
  q('moyen', 'qcm', 'Quel club grec est le plus titré du pays ?', ['Olympiakos', 'Panathinaïkos', 'AEK Athènes', 'PAOK Salonique'], 0, 'Largement dominateur en championnat.'),
  q('moyen', 'intrus', 'Lequel de ces clubs n’a jamais été champion d’Angleterre ?', ['West Ham United', 'Leicester City', 'Blackburn Rovers', 'Nottingham Forest'], 0, 'Les trois autres ont tous décroché au moins un titre.'),
  q('moyen', 'qcm', 'Quel club a remporté la Premier League en 2016 contre toute attente ?', ['Leicester City', 'Tottenham', 'Everton', 'Southampton'], 0, 'Une saison devenue un symbole, sous Claudio Ranieri.'),
  q('moyen', 'qcm', 'Quel club français a remporté la Ligue 1 en 2012 ?', ['Montpellier', 'Paris Saint-Germain', 'Lille', 'Lyon'], 0, 'Un titre surprise porté par Olivier Giroud.'),
  q('moyen', 'qcm', 'Quel club allemand a remporté la Bundesliga en 2024, mettant fin à onze titres consécutifs du Bayern ?', ['Bayer Leverkusen', 'Borussia Dortmund', 'RB Leipzig', 'Stuttgart'], 0, 'Une saison de championnat sans la moindre défaite.'),
  q('moyen', 'vrai-faux', 'L’Atlético de Madrid a déjà été champion d’Espagne au XXIe siècle.', VF, 0, 'En 2014 et en 2021, sous Diego Simeone.'),
  q('moyen', 'qcm', 'Quel club a remporté le championnat d’Italie en 2023, quarante ans après son dernier titre ?', ['Naples', 'AS Rome', 'Lazio', 'Fiorentina'], 0, 'Le premier Scudetto napolitain depuis l’ère Maradona.'),
  q('moyen', 'qcm', 'Quel est le surnom du Borussia Dortmund lié à l’ambiance de son stade ?', ['Le Mur jaune', 'La Muraille noire', 'Le Chaudron', 'La Tribune rouge'], 0, 'Une tribune debout de près de vingt-cinq mille places.'),
  q('moyen', 'qcm', 'Quel club portugais a été champion en 2021, brisant une longue domination Benfica-Porto ?', ['Sporting Portugal', 'Braga', 'Vitória Guimarães', 'Boavista'], 0, 'Dix-neuf ans après son précédent titre.'),
  q('moyen', 'devine', 'Club anglais invaincu sur toute une saison de Premier League en 2003-2004.', ['Arsenal', 'Chelsea', 'Manchester United', 'Liverpool'], 0, 'Les « Invincibles » d’Arsène Wenger.'),
  q('moyen', 'qcm', 'Quel club turc est surnommé « les Lions » et joue à Istanbul ?', ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor'], 0, 'Vainqueur de la Coupe UEFA en 2000.'),
  q('moyen', 'qcm', 'Quel club a remporté le plus de Coupes de France ?', ['Paris Saint-Germain', 'Olympique de Marseille', 'Lyon', 'Saint-Étienne'], 0, 'Le PSG a dépassé l’OM dans les années 2010.'),
  q('moyen', 'qcm', 'Quel club détient le record de titres de champion de France ?', ['Paris Saint-Germain', 'Saint-Étienne', 'Marseille', 'Nantes'], 0, 'Le PSG a dépassé en 2022 les dix titres de Saint-Étienne.'),

  // ---------------------------- DIFFICILE ----------------------------
  q('difficile', 'date', 'En quelle année le FC Barcelone a-t-il été fondé ?', ['1899', '1902', '1890', '1912'], 0, 'À l’initiative du Suisse Joan Gamper.'),
  q('difficile', 'qcm', 'Quel club anglais est le plus ancien club professionnel de football encore en activité ?', ['Notts County', 'Sheffield United', 'Preston North End', 'Stoke City'], 0, 'Fondé en 1862.'),
  q('difficile', 'qcm', 'Quel club a remporté la Coupe d’Europe en 1988 en battant le Real Madrid puis le Benfica ?', ['PSV Eindhoven', 'Ajax Amsterdam', 'Steaua Bucarest', 'Porto'], 0, 'Un PSV emmené par Ronald Koeman.'),
  q('difficile', 'qcm', 'Quel club roumain a remporté la Coupe d’Europe en 1986 ?', ['Steaua Bucarest', 'Dinamo Bucarest', 'Rapid Bucarest', 'Universitatea Craiova'], 0, 'Aux tirs au but contre le Barça, avec un gardien irrésistible.'),
  q('difficile', 'intrus', 'Lequel de ces clubs n’a jamais remporté de compétition européenne ?', ['Olympique lyonnais', 'Parme', 'Göteborg', 'Feyenoord'], 0, 'Lyon n’a jamais soulevé de trophée continental.'),
  q('difficile', 'qcm', 'Quel club a remporté la Coupe Intercontinentale à trois reprises ?', ['Peñarol', 'Santos', 'Boca Juniors', 'Milan AC'], 0, 'Le club uruguayen l’a emportée en 1961, 1966 et 1982.'),
  q('difficile', 'devine', 'Club brésilien de Pelé, basé dans une ville portuaire de l’État de São Paulo.', ['Santos', 'Flamengo', 'Palmeiras', 'Corinthians'], 0, 'Il y a passé presque toute sa carrière.'),
  q('difficile', 'qcm', 'Quel club a été champion d’Angleterre en 1995 après avoir été racheté par un industriel local ?', ['Blackburn Rovers', 'Leeds United', 'Aston Villa', 'Newcastle'], 0, 'Porté par les buts d’Alan Shearer.'),
  q('difficile', 'qcm', 'Quel club français a atteint la finale de la Coupe UEFA en 2004 ?', ['Olympique de Marseille', 'Monaco', 'Auxerre', 'Lens'], 0, 'Battu par Valence à Göteborg.'),
  q('difficile', 'vrai-faux', 'Un club russe a déjà remporté une compétition européenne.', VF, 0, 'Le Zénith Saint-Pétersbourg et le CSKA Moscou ont gagné la Coupe UEFA.'),
  q('difficile', 'qcm', 'Quel club espagnol basque refuse historiquement de recruter hors de sa région ?', ['Athletic Bilbao', 'Real Sociedad', 'Osasuna', 'Alavés'], 0, 'Une politique sportive unique en Europe.'),
  q('difficile', 'qcm', 'Quel club détient le record de victoires en Coupe du monde des clubs ?', ['Real Madrid', 'Barcelone', 'Bayern Munich', 'Corinthians'], 0, 'Le club madrilène domine largement cette compétition.'),
  q('difficile', 'qcm', 'Quel club a remporté la Ligue Conférence lors de sa première édition, en 2022 ?', ['AS Rome', 'Feyenoord', 'Leicester City', 'Marseille'], 0, 'Sous la direction de José Mourinho.'),
  q('difficile', 'date', 'En quelle année le Paris Saint-Germain a-t-il été fondé ?', ['1970', '1932', '1958', '1980'], 0, 'De la fusion entre le Stade saint-germanois et le Paris FC.'),
  q('difficile', 'qcm', 'Quel club a remporté le championnat d’Italie 1991-1992 sans perdre un seul match ?', ['Milan AC', 'Juventus', 'Naples', 'Sampdoria'], 0, 'Le Milan de Fabio Capello, invaincu sur toute la saison.'),
  q('difficile', 'qcm', 'Quel club a vu naître le surnom « les Galactiques » ?', ['Real Madrid', 'Barcelone', 'Manchester City', 'Chelsea'], 0, 'La politique de recrutement de Florentino Pérez au début des années 2000.'),

  q('facile', 'qcm', 'Quel club italien est surnommé « les Nerazzurri » ?', ['Inter Milan', 'Milan AC', 'Juventus', 'Naples'], 0, 'En référence à son maillot rayé noir et bleu.'),
  q('moyen', 'qcm', 'Quel club détient le record de victoires en Ligue Europa ?', ['Séville', 'Valence', 'Liverpool', 'Inter Milan'], 0, 'Sept trophées, dont plusieurs sous la direction d’Unai Emery.'),
  q('difficile', 'qcm', 'Quel club allemand a remporté la Coupe UEFA en 1997 ?', ['Schalke 04', 'Borussia Dortmund', 'Bayern Munich', 'Bayer Leverkusen'], 0, 'Aux tirs au but contre l’Inter Milan.'),
];
