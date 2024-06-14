import { Test, TestingModule } from "@nestjs/testing";
import { PrismarService } from "./prismar.service";

describe("PrismarService", () => {
  let service: PrismarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismarService]
    }).compile();

    service = module.get<PrismarService>(PrismarService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
