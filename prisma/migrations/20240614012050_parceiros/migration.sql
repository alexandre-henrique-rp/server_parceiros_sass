-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailcontato` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `datanasc` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `pixkey` VARCHAR(191) NULL,
    `roles` JSON NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_pixkey_key`(`pixkey`),
    UNIQUE INDEX `User_uuid_email_key`(`uuid`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AGRV` (
    `idagrv` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NULL,
    `cpf` VARCHAR(20) NULL,
    `nascimento` DATE NULL,
    `rg` VARCHAR(20) NULL,
    `linkcnh` VARCHAR(150) NULL,
    `linkfotoperfil` VARCHAR(150) NULL,
    `logradouro` VARCHAR(150) NULL,
    `numero` VARCHAR(150) NULL,
    `complemento` VARCHAR(150) NULL,
    `cep` VARCHAR(150) NULL,
    `municipio` VARCHAR(150) NULL,
    `codmunicipio` VARCHAR(150) NULL,
    `uf` VARCHAR(150) NULL,
    `whatsapp` VARCHAR(150) NULL,
    `celular` VARCHAR(150) NULL,
    `fixo` VARCHAR(150) NULL,
    `email` VARCHAR(150) NULL,
    `email2` VARCHAR(150) NULL,
    `permissaoacesso` VARCHAR(150) NULL,
    `senha` VARCHAR(150) NULL,
    `chavepix` VARCHAR(150) NULL,
    `nomebanco` VARCHAR(150) NULL,
    `numerobanco` VARCHAR(150) NULL,
    `numeroagencia` VARCHAR(150) NULL,
    `numeroconta` VARCHAR(150) NULL,
    `tipocontabanco` VARCHAR(150) NULL,
    `nomepolo` VARCHAR(150) NULL,
    `numeropolo` INTEGER NOT NULL,
    `linklogopolo` VARCHAR(150) NULL,
    `municipiopolo` VARCHAR(150) NULL,
    `ufpolo` VARCHAR(150) NULL,
    `a1pj_12m` INTEGER NULL,
    `a3pj_36m` INTEGER NULL,
    `a1pf_12m` INTEGER NULL,
    `a3pf_36m` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `tipopix` VARCHAR(150) NULL,
    `bairro` VARCHAR(150) NULL,
    `painel_agrv` INTEGER NULL,
    `obs` VARCHAR(150) NULL,

    UNIQUE INDEX `AGRV_numeropolo_key`(`numeropolo`),
    PRIMARY KEY (`idagrv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fcweb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `s_alerta` VARCHAR(150) NULL,
    `referencia` VARCHAR(150) NULL,
    `id_boleto` VARCHAR(150) NULL,
    `id_cancelar_bol_rem` VARCHAR(150) NULL,
    `unidade` VARCHAR(150) NULL,
    `responsavel` VARCHAR(150) NULL,
    `criou_fc` VARCHAR(150) NOT NULL,
    `andamento` VARCHAR(150) NULL,
    `prioridade` VARCHAR(150) NULL,
    `solicitacao` VARCHAR(150) NULL,
    `venda` VARCHAR(150) NULL,
    `cpf` VARCHAR(150) NULL,
    `cnpj` VARCHAR(150) NULL,
    `nome` VARCHAR(150) NULL,
    `razaosocial` VARCHAR(150) NULL,
    `vectoboleto` DATE NULL,
    `unico` VARCHAR(150) NULL,
    `contador` VARCHAR(150) NULL,
    `obscont` VARCHAR(150) NULL,
    `comissaoparceiro` FLOAT NULL,
    `scp` VARCHAR(10) NULL,
    `tipocd` VARCHAR(150) NULL,
    `valorcd` VARCHAR(150) NULL,
    `custocd` VARCHAR(150) NULL,
    `custoCdpar` VARCHAR(150) NULL,
    `estatos_pgto` VARCHAR(150) NULL,
    `pgto_efi` VARCHAR(100) NOT NULL,
    `formapgto` VARCHAR(150) NULL,
    `vouchersoluti` VARCHAR(150) NULL,
    `ct_parcela` VARCHAR(150) NULL,
    `telefone` VARCHAR(150) NULL,
    `telefone2` VARCHAR(150) NULL,
    `email` VARCHAR(150) NULL,
    `dtnascimento` VARCHAR(150) NULL,
    `rg` VARCHAR(150) NULL,
    `cei` VARCHAR(150) NULL,
    `endereco` VARCHAR(150) NULL,
    `nrua` VARCHAR(150) NULL,
    `bairro` VARCHAR(150) NULL,
    `complemento` VARCHAR(150) NULL,
    `cep` VARCHAR(150) NULL,
    `uf` VARCHAR(150) NULL,
    `im` INTEGER NOT NULL,
    `cidade` VARCHAR(150) NULL,
    `observacao` VARCHAR(150) NULL,
    `vctoCD` DATE NULL,
    `historico` TEXT NULL,
    `arquivo` VARCHAR(100) NULL,
    `nomearquivo` VARCHAR(100) NULL,
    `obsrenovacao` VARCHAR(150) NULL,
    `dt_aprovacao` DATE NULL,
    `comicao` FLOAT NULL,
    `validacao` VARCHAR(150) NULL,
    `nfe` VARCHAR(150) NULL,
    `urlnota` TEXT NULL,
    `id_fcw_soluti` VARCHAR(11) NULL,
    `dt_agenda` DATE NULL,
    `hr_agenda` TIME(0) NULL,
    `obs_agenda` VARCHAR(150) NULL,
    `reg_cnh` VARCHAR(150) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price_cert` (
    `Uuid` VARCHAR(191) NOT NULL,
    `FcwebId` INTEGER NOT NULL,
    `Date_int` DATETIME(0) NULL,
    `Status_pg` VARCHAR(100) NOT NULL,
    `Cliente_acess` BOOLEAN NOT NULL DEFAULT false,
    `Date_venc` DATE NULL,
    `Parcelas` VARCHAR(3) NULL,
    `TxidPix` VARCHAR(150) NULL,
    `TxidBoleto` INTEGER NULL,
    `TxidCartao` VARCHAR(150) NULL,
    `QrLink` TEXT NULL,
    `QrBase64` TEXT NULL,
    `CreatePixDate` DATETIME(0) NULL,
    `PixStatus` VARCHAR(100) NULL,
    `PixCopiaECola` VARCHAR(150) NULL,
    `BarCode` VARCHAR(180) NULL,
    `LinkBolix` TEXT NULL,
    `LinkBoleto` TEXT NULL,
    `LinkBoletoPdf` TEXT NULL,
    `Card_Adm` VARCHAR(20) NULL,
    `payment_token` TEXT NULL,
    `payment_url` TEXT NULL,
    `UrlPg` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `Boleto` BOOLEAN NULL DEFAULT false,
    `Cartao` BOOLEAN NULL DEFAULT false,
    `Pix` BOOLEAN NULL DEFAULT false,
    `Date_pg` DATETIME(0) NULL,

    UNIQUE INDEX `price_cert_Uuid_key`(`Uuid`),
    INDEX `fcweb_ib`(`FcwebId`),
    PRIMARY KEY (`Uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `price_cert` ADD CONSTRAINT `fcweb_ib` FOREIGN KEY (`FcwebId`) REFERENCES `fcweb`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;