import { VF, make } from './make';

const q = make('legendes');

export const LEGENDES = [
  // ----------------------------- FACILE -----------------------------
  q('facile', 'devine', 'Brésilien, surnommé « le Roi », il reste le seul triple champion du monde.', ['Pelé', 'Garrincha', 'Zico', 'Romário'], 0, 'Sacré en 1958, 1962 et 1970.'),
  q('facile', 'devine', 'Argentin, auteur du « but du siècle » et de la « Main de Dieu » dans le même match.', ['Diego Maradona', 'Lionel Messi', 'Gabriel Batistuta', 'Juan Román Riquelme'], 0, 'Contre l’Angleterre, en quart de finale de la Coupe du monde 1986.'),
  q('facile', 'qcm', 'De quelle nationalité était Johan Cruyff ?', ['Néerlandaise', 'Allemande', 'Belge', 'Danoise'], 0, 'Figure de proue du football total néerlandais.'),
  q('facile', 'qcm', 'Quel club Lionel Messi a-t-il rejoint en 2021 en quittant le Barça ?', ['Paris Saint-Germain', 'Manchester City', 'Inter Miami', 'Chelsea'], 0, 'Avant de rejoindre l’Inter Miami en 2023.'),
  q('facile', 'qcm', 'Dans quel club Cristiano Ronaldo a-t-il été formé ?', ['Sporting Portugal', 'Benfica', 'Porto', 'Manchester United'], 0, 'Manchester United le recrute à dix-huit ans.'),
  q('facile', 'vrai-faux', 'Zinédine Zidane a joué pour la Juventus avant le Real Madrid.', VF, 0, 'Cinq saisons à Turin, de 1996 à 2001.'),
  q('facile', 'qcm', 'Quel joueur est surnommé « Ibra » ?', ['Zlatan Ibrahimović', 'Ibrahima Konaté', 'Ibrahim Afellay', 'Abdoulaye Ibrahim'], 0, 'L’attaquant suédois aux huit championnats nationaux différents.'),
  q('facile', 'devine', 'Attaquant français, meilleur buteur de l’histoire d’Arsenal, surnommé « Titi ».', ['Thierry Henry', 'Nicolas Anelka', 'Olivier Giroud', 'David Trezeguet'], 0, 'Deux Souliers d’or européens sous le maillot des Gunners.'),
  q('facile', 'qcm', 'Quel pays Diego Maradona a-t-il mené au titre mondial en 1986 ?', ['Argentine', 'Brésil', 'Uruguay', 'Italie'], 0, 'Une Coupe du monde qu’il a dominée de bout en bout.'),
  q('facile', 'qcm', 'Dans quel club Ronaldinho a-t-il remporté la Ligue des champions ?', ['Barcelone', 'Milan AC', 'Paris Saint-Germain', 'Flamengo'], 0, 'En 2006, contre Arsenal.'),
  q('facile', 'vrai-faux', 'Pelé a joué toute sa carrière au Brésil.', VF, 1, 'Il a terminé au Cosmos de New York, de 1975 à 1977.'),
  q('facile', 'qcm', 'Quel gardien italien a joué jusqu’à plus de quarante ans et remporté la Coupe du monde 2006 ?', ['Gianluigi Buffon', 'Dino Zoff', 'Walter Zenga', 'Francesco Toldo'], 0, 'Plus de cent soixante sélections avec la Squadra Azzurra.'),
  q('facile', 'qcm', 'Quel joueur portugais a marqué dans cinq Coupes du monde différentes ?', ['Cristiano Ronaldo', 'Luís Figo', 'Eusébio', 'Rui Costa'], 0, 'De 2006 à 2022, un record.'),
  q('facile', 'devine', 'Suédois au caractère bien trempé, il a joué à l’Ajax, à la Juventus, à l’Inter, au Barça, au Milan, au PSG et à Manchester United.', ['Zlatan Ibrahimović', 'Henrik Larsson', 'Freddie Ljungberg', 'Emil Forsberg'], 0, 'Champion dans quatre pays différents.'),
  q('facile', 'qcm', 'Quel club a vu Lionel Messi faire toute sa formation ?', ['Barcelone', 'Newell’s Old Boys', 'River Plate', 'Boca Juniors'], 0, 'Arrivé à La Masia à treize ans, après des débuts à Newell’s.'),
  q('facile', 'qcm', 'Quel joueur français a remporté la Ligue des champions avec le Real Madrid en 2002 ?', ['Zinédine Zidane', 'Thierry Henry', 'Patrick Vieira', 'Robert Pirès'], 0, 'Avec sa volée restée célèbre en finale.'),
  q('facile', 'vrai-faux', 'Michel Platini a joué à la Juventus.', VF, 0, 'De 1982 à 1987, période de ses trois Ballons d’Or.'),

  // ------------------------------ MOYEN ------------------------------
  q('moyen', 'devine', 'Allemand, surnommé « le Kaiser », il a remporté la Coupe du monde comme joueur puis comme sélectionneur.', ['Franz Beckenbauer', 'Gerd Müller', 'Lothar Matthäus', 'Paul Breitner'], 0, 'Champion en 1974, puis sélectionneur victorieux en 1990.'),
  q('moyen', 'qcm', 'Quel joueur a inscrit plus de cinq cents buts pour le Barça ?', ['Lionel Messi', 'Luis Suárez', 'Samuel Eto’o', 'Ronaldinho'], 0, 'Un total hors norme en dix-sept saisons professionnelles.'),
  q('moyen', 'devine', 'Italien à la queue de cheval, son penalty manqué a coûté la finale de la Coupe du monde 1994.', ['Roberto Baggio', 'Franco Baresi', 'Daniele Massaro', 'Gianluca Vialli'], 0, 'Un tir au-dessus de la barre contre le Brésil.'),
  q('moyen', 'qcm', 'Quel attaquant néerlandais a marqué une volée mémorable en finale de l’Euro 1988 ?', ['Marco van Basten', 'Ruud Gullit', 'Dennis Bergkamp', 'Patrick Kluivert'], 0, 'Une reprise impossible depuis l’angle droit de la surface.'),
  q('moyen', 'qcm', 'Combien de clubs Paolo Maldini a-t-il eus en carrière professionnelle ?', ['Un', 'Deux', 'Trois', 'Quatre'], 0, 'Vingt-cinq saisons au Milan AC, et rien d’autre.'),
  q('moyen', 'intrus', 'Lequel de ces joueurs n’a jamais joué au Real Madrid ?', ['Johan Cruyff', 'Luís Figo', 'Zinédine Zidane', 'Ronaldo'], 0, 'Cruyff a joué au Barça, jamais chez son grand rival.'),
  q('moyen', 'devine', 'Ivoirien, il a marqué puis transformé le penalty décisif de la finale de la Ligue des champions 2012.', ['Didier Drogba', 'Yaya Touré', 'Salomon Kalou', 'Gervinho'], 0, 'Son dernier match avec Chelsea.'),
  q('moyen', 'qcm', 'Quel joueur a remporté la Ligue des champions avec Porto en 2004 puis avec le Barça en 2006 ?', ['Deco', 'Ricardo Carvalho', 'Maniche', 'Paulo Ferreira'], 0, 'Deux titres en trois ans, avec deux clubs et deux entraîneurs différents.'),
  q('moyen', 'qcm', 'Dans quel club George Best a-t-il connu ses plus grandes heures ?', ['Manchester United', 'Liverpool', 'Chelsea', 'Celtic Glasgow'], 0, 'Ballon d’Or 1968, l’année de la Coupe d’Europe.'),
  q('moyen', 'vrai-faux', 'Garrincha a remporté la Coupe du monde 1962 alors que Pelé était blessé.', VF, 0, 'Il porte le Brésil à lui seul lors de cette édition.'),
  q('moyen', 'qcm', 'Quel milieu espagnol formait le cœur du jeu du Barça de Guardiola avec Iniesta ?', ['Xavi', 'Sergio Busquets', 'Cesc Fàbregas', 'David Silva'], 0, 'Xavi, maître du tempo et des passes courtes.'),
  q('moyen', 'devine', 'Camerounais, il a remporté deux Ligues des champions consécutives avec deux clubs différents.', ['Samuel Eto’o', 'Patrick Mboma', 'Roger Milla', 'Geremi'], 0, 'Barcelone en 2009, puis l’Inter en 2010.'),
  q('moyen', 'qcm', 'Quel joueur a inscrit le plus de buts sur une saison de championnat en Europe depuis 1950 ?', ['Lionel Messi', 'Cristiano Ronaldo', 'Robert Lewandowski', 'Gerd Müller'], 0, 'Cinquante buts en Liga lors de la saison 2011-2012.'),
  q('moyen', 'qcm', 'Quel club Franz Beckenbauer a-t-il marqué de son empreinte ?', ['Bayern Munich', 'Borussia Mönchengladbach', 'Hambourg', 'Schalke 04'], 0, 'Trois Coupes d’Europe consécutives au milieu des années 1970.'),
  q('moyen', 'qcm', 'Quel attaquant uruguayen a joué à l’Ajax, à Liverpool, au Barça et à l’Atlético ?', ['Luis Suárez', 'Edinson Cavani', 'Diego Forlán', 'Darwin Núñez'], 0, 'Champion d’Espagne avec deux clubs différents.'),
  q('moyen', 'devine', 'Croate, Ballon d’Or 2018, il a construit le jeu du Real Madrid pendant plus d’une décennie.', ['Luka Modrić', 'Ivan Rakitić', 'Mateo Kovačić', 'Marcelo Brozović'], 0, 'Arrivé de Tottenham en 2012.'),

  // ---------------------------- DIFFICILE ----------------------------
  q('difficile', 'devine', 'Argentin naturalisé espagnol, il a porté le Real Madrid sur ses cinq premières Coupes d’Europe.', ['Alfredo Di Stéfano', 'Ferenc Puskás', 'Raymond Kopa', 'Francisco Gento'], 0, 'La « Flèche blonde », buteur dans les cinq finales.'),
  q('difficile', 'qcm', 'Quel joueur hongrois a mené la « Grande Hongrie » des années 1950 ?', ['Ferenc Puskás', 'Nándor Hidegkuti', 'Sándor Kocsis', 'Zoltán Czibor'], 0, 'Il rejoindra ensuite le Real Madrid.'),
  q('difficile', 'qcm', 'Combien de Coupes d’Europe Francisco Gento a-t-il remportées ?', ['Six', 'Quatre', 'Cinq', 'Sept'], 0, 'Un record individuel longtemps tenu pour inapprochable.'),
  q('difficile', 'devine', 'Portugais né au Mozambique, surnommé « la Panthère noire », meilleur buteur de la Coupe du monde 1966.', ['Eusébio', 'Mário Coluna', 'José Torres', 'Simões'], 0, 'Neuf buts, dont quatre contre la Corée du Nord.'),
  q('difficile', 'qcm', 'Quel joueur brésilien, médecin de formation, était surnommé « le Docteur » ?', ['Sócrates', 'Zico', 'Falcão', 'Júnior'], 0, 'Capitaine du Brésil 1982 et figure de la « démocratie corinthiane ».'),
  q('difficile', 'intrus', 'Lequel de ces joueurs n’a jamais remporté la Coupe du monde ?', ['Johan Cruyff', 'Franz Beckenbauer', 'Bobby Moore', 'Daniel Passarella'], 0, 'Cruyff a perdu la finale 1974 contre la RFA de Beckenbauer.'),
  q('difficile', 'qcm', 'Quel gardien soviétique est considéré comme le meilleur de l’histoire par beaucoup ?', ['Lev Yachine', 'Rinat Dasaïev', 'Vladimir Beskov', 'Anzor Kavazashvili'], 0, 'Seul gardien Ballon d’Or, en 1963.'),
  q('difficile', 'qcm', 'Quel joueur a marqué plus de six cents buts pour un seul club, le Bayern Munich ?', ['Gerd Müller', 'Karl-Heinz Rummenigge', 'Thomas Müller', 'Uli Hoeneß'], 0, 'Un ratio de buts jamais égalé en Bundesliga.'),
  q('difficile', 'devine', 'Anglais, capitaine champion du monde en 1966, il reste le symbole de l’élégance défensive.', ['Bobby Moore', 'Bobby Charlton', 'Jack Charlton', 'Nobby Stiles'], 0, 'Le tacle qu’il réussit sur Jairzinho en 1970 est resté un modèle.'),
  q('difficile', 'qcm', 'Lequel de ces joueurs français était capitaine de l’Olympique de Marseille sacré champion d’Europe en 1993 ?', ['Didier Deschamps', 'Zinédine Zidane', 'Laurent Blanc', 'Emmanuel Petit'], 0, 'À vingt-quatre ans, il soulevait déjà le trophée.'),
  q('difficile', 'vrai-faux', 'Roger Milla a marqué en Coupe du monde après ses quarante ans.', VF, 0, 'Contre la Russie en 1994, à quarante-deux ans.'),
  q('difficile', 'qcm', 'Quel joueur danois a remporté l’Euro 1992 avant de gagner la Ligue des champions avec Manchester United ?', ['Peter Schmeichel', 'Brian Laudrup', 'Michael Laudrup', 'Jon Dahl Tomasson'], 0, 'Le gardien du triplé de 1999.'),
  q('difficile', 'qcm', 'Quel attaquant bulgare a remporté le Ballon d’Or 1994 ?', ['Hristo Stoichkov', 'Emil Kostadinov', 'Yordan Letchkov', 'Krassimir Balakov'], 0, 'Après une demi-finale de Coupe du monde avec la Bulgarie.'),
  q('difficile', 'devine', 'Roumain, surnommé « le Maradona des Carpates ».', ['Gheorghe Hagi', 'Florin Răducioiu', 'Dan Petrescu', 'Adrian Mutu'], 0, 'Son lob contre la Colombie en 1994 est resté célèbre.'),
  q('difficile', 'qcm', 'Quel joueur néerlandais a remporté la Ligue des champions avec trois clubs différents ?', ['Clarence Seedorf', 'Edgar Davids', 'Patrick Kluivert', 'Frank Rijkaard'], 0, 'L’Ajax en 1995, le Real Madrid en 1998, puis le Milan AC.'),
  q('difficile', 'qcm', 'Dans quel club Eusébio a-t-il passé l’essentiel de sa carrière ?', ['Benfica', 'Sporting', 'Porto', 'Belenenses'], 0, 'Plus de six cents buts sous le maillot des Aigles.'),

  q('facile', 'qcm', 'Quel joueur portugais a soulevé l’Euro 2016 en tant que capitaine ?', ['Cristiano Ronaldo', 'Luís Figo', 'Rui Costa', 'Deco'], 0, 'Sorti sur blessure en finale, il a encouragé ses coéquipiers depuis la touche.'),
  q('moyen', 'qcm', 'Quel attaquant polonais a quitté le Bayern Munich pour le Barça en 2022 ?', ['Robert Lewandowski', 'Arkadiusz Milik', 'Krzysztof Piątek', 'Jakub Błaszczykowski'], 0, 'Après huit saisons et plus de trois cents buts en Bavière.'),
  q('difficile', 'devine', 'Brésilien surnommé « le Phénomène », il a remporté deux Ballons d’Or malgré de graves blessures au genou.', ['Ronaldo', 'Ronaldinho', 'Rivaldo', 'Adriano'], 0, 'Revenu au plus haut niveau pour être sacré champion du monde en 2002.'),
];
