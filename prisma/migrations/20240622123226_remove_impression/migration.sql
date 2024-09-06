-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "StorageFolderEnum" AS ENUM ('ebooks', 'booksCovers');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('email', 'google');

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "emoji" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendable" BOOLEAN NOT NULL DEFAULT true,
    "picture" TEXT NOT NULL,
    "ebook" TEXT NOT NULL,
    "readingTime" INTEGER NOT NULL DEFAULT 0,
    "chapters" INTEGER NOT NULL DEFAULT 0,
    "pagesCount" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "mainGenreId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "text" TEXT NOT NULL,
    "xpath" TEXT NOT NULL,
    "startOffset" INTEGER NOT NULL,
    "endOffset" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bookSlug" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "BookTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "goalMinutes" INTEGER NOT NULL DEFAULT 10,
    "socialId" TEXT,
    "password" TEXT,
    "authType" "AuthType" NOT NULL DEFAULT 'email',
    "picture" TEXT NOT NULL DEFAULT 'fallback.png',
    "fullName" TEXT NOT NULL DEFAULT 'unknown',
    "location" TEXT NOT NULL DEFAULT 'unknown',
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "readingTimeMs" INTEGER NOT NULL,
    "scrollPosition" INTEGER NOT NULL,
    "startProgress" DOUBLE PRECISION NOT NULL,
    "endProgress" DOUBLE PRECISION NOT NULL,
    "progressDelta" DOUBLE PRECISION NOT NULL,
    "bookSlug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReadingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BookGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FinishedBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReadingBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SimilarBooks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BookTemplateToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "genre_slug_index" ON "Genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE INDEX "book_slug_index" ON "Book"("slug");

-- CreateIndex
CREATE INDEX "reaction_id_index" ON "Reaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookTemplate_title_key" ON "BookTemplate"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BookTemplate_slug_key" ON "BookTemplate"("slug");

-- CreateIndex
CREATE INDEX "book_template_slug_index" ON "BookTemplate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_socialId_key" ON "User"("socialId");

-- CreateIndex
CREATE INDEX "user_id_index" ON "User"("id");

-- CreateIndex
CREATE INDEX "reading_history_user_id_index" ON "ReadingHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToUser_AB_unique" ON "_GenreToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToUser_B_index" ON "_GenreToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookGenre_AB_unique" ON "_BookGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_BookGenre_B_index" ON "_BookGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FinishedBooks_AB_unique" ON "_FinishedBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_FinishedBooks_B_index" ON "_FinishedBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedBooks_AB_unique" ON "_SavedBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedBooks_B_index" ON "_SavedBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReadingBooks_AB_unique" ON "_ReadingBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_ReadingBooks_B_index" ON "_ReadingBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SimilarBooks_AB_unique" ON "_SimilarBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_SimilarBooks_B_index" ON "_SimilarBooks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookTemplateToGenre_AB_unique" ON "_BookTemplateToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_BookTemplateToGenre_B_index" ON "_BookTemplateToGenre"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_mainGenreId_fkey" FOREIGN KEY ("mainGenreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_bookSlug_fkey" FOREIGN KEY ("bookSlug") REFERENCES "Book"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_bookSlug_fkey" FOREIGN KEY ("bookSlug") REFERENCES "Book"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingHistory" ADD CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToUser" ADD CONSTRAINT "_GenreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookGenre" ADD CONSTRAINT "_BookGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookGenre" ADD CONSTRAINT "_BookGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FinishedBooks" ADD CONSTRAINT "_FinishedBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FinishedBooks" ADD CONSTRAINT "_FinishedBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBooks" ADD CONSTRAINT "_SavedBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBooks" ADD CONSTRAINT "_SavedBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadingBooks" ADD CONSTRAINT "_ReadingBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReadingBooks" ADD CONSTRAINT "_ReadingBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SimilarBooks" ADD CONSTRAINT "_SimilarBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SimilarBooks" ADD CONSTRAINT "_SimilarBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookTemplateToGenre" ADD CONSTRAINT "_BookTemplateToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "BookTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookTemplateToGenre" ADD CONSTRAINT "_BookTemplateToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
