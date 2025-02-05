CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`size` bigint NOT NULL,
	`last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`folder_id` int NOT NULL,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_folder_id_folders_id_fk` FOREIGN KEY (`folder_id`) REFERENCES `folders`(`id`) ON DELETE no action ON UPDATE no action;