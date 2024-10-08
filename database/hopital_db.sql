-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 08 oct. 2024 à 09:25
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hopital_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `attente`
--

CREATE TABLE `attente` (
  `id` int(11) NOT NULL,
  `hop_id` int(11) DEFAULT NULL,
  `arrive` time DEFAULT NULL,
  `depart` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hopitaux`
--

CREATE TABLE `hopitaux` (
  `id` int(11) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Rue` varchar(255) DEFAULT NULL,
  `Ville` varchar(255) DEFAULT NULL,
  `CP` int(11) DEFAULT NULL,
  `PMR` tinyint(1) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hopitaux`
--

INSERT INTO `hopitaux` (`id`, `Nom`, `Rue`, `Ville`, `CP`, `PMR`, `longitude`, `latitude`) VALUES
(1, 'Site hospitalier de Purpan', 'Place Du Docteur Baylac TSA 40031', ' Toulouse', 31059, 0, 1.39736, 43.6082),
(2, 'Hôpital Rangueil', '1	 avenue du Professeur Jean Pouhles', 'Toulouse', 31059, 0, 1.45377, 43.5586),
(3, 'Centre Hospitalier Gérard Marchant', '134	Route d Espagne', 'TOULOUSE', 31057, 1, 1.42436, 43.5596),
(4, 'Hôpital des enfants et Paule de Viguier', '330	avenue de Grande-Bretagne', 'Toulouse', 31059, 1, 2.54674, 48.8762),
(5, 'Hôpital Larrey', '24	chemin de Pouvourville', 'Toulouse', 31059, 1, 1.4563, 43.553),
(6, 'Hôpital Garonne', '224	 avenue de Casselardit', 'Toulouse', 31059, 0, 1.39937, 43.6165),
(7, 'Institut Claudius Regaud', '1	avenue Irene Joliot-Curie', 'Toulouse', 31059, 1, 1.42637, 43.5553),
(8, 'établissement de soins MCO Hôpital Joseph Ducuing', '15 rue Varsovie', 'TOULOUSE', 31027, 1, 1.43014, 43.5965),
(9, 'Unité de soins de longue durée Les Jardins des Silos', '8	Chemin Des Silos', ' TOULOUSE', 31100, 1, 1.41936, 43.5572),
(10, 'Hôpital La Grave', 'Place Lange', ' Toulouse', 31059, 0, 1.43409, 43.6008);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `attente`
--
ALTER TABLE `attente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hop_id` (`hop_id`);

--
-- Index pour la table `hopitaux`
--
ALTER TABLE `hopitaux`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attente`
--
ALTER TABLE `attente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `hopitaux`
--
ALTER TABLE `hopitaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `attente`
--
ALTER TABLE `attente`
  ADD CONSTRAINT `attente_ibfk_1` FOREIGN KEY (`hop_id`) REFERENCES `hopitaux` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
