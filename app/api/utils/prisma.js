const { PrismaClient } = require("@prisma/client");

class Db extends PrismaClient {
  static instance;
  constructor() {
    if (!Db.instance) {
      Db.instance = new PrismaClient();
    }
    return Db.instance;
  }
}

module.exports = Db;
