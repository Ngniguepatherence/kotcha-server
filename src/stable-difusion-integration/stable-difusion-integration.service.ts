import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GenerateImageDto } from './generate-image.dto';
import { getDataFolderPath, persistData } from 'src/utils/file.utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StableDifusionIntegrationService {

    constructor(private readonly httpService:HttpService){}



    async generateImage(generateImage:GenerateImageDto) {
        const engineId = 'stable-diffusion-v1-5';

        const prompts:any[] = [
          {
            text:generateImage.prompt,
            weight:1
          },
        ]
        if(generateImage.negativePrompt){
          prompts.push({
            text:generateImage.negativePrompt,
            weight:-1
          })
        }


        const result = await this.httpService.post(
            `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
              {
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: generateImage.imageHeight,
                width: generateImage.imageWidth,
                samples: 1,
                steps: 50,
                text_prompts: prompts,
            },
            {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'image/png',
                Authorization: process.env.API_KEY,
              },
              responseType: 'arraybuffer',
            },
        
          );
           
        const data = await lastValueFrom(result);
        const filePath = `${getDataFolderPath()}/${Date.now()}.png`
        persistData(Buffer.from(data.data),filePath)
         
        console.log(filePath)
        return filePath
    }
}
