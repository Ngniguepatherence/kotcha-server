import { Test, TestingModule } from '@nestjs/testing';
import { StableDifusionIntegrationService } from './stable-difusion-integration.service';

describe('StableDifusionIntegrationService', () => {
  let service: StableDifusionIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StableDifusionIntegrationService],
    }).compile();

    service = module.get<StableDifusionIntegrationService>(StableDifusionIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
