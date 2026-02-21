import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
import { PiTextbox } from "react-icons/pi";


export default function Footer() {
  return (
    <footer
      className="
        mb-16
      "
    >
      <Flex gap="4">
        <Box height="10" order="1">
          <Flex gap="1">
          <Icon size="md">
              <img src="https://favicon.im/github.com" alt="linkedin.com favicon" />
            </Icon>{"Github"}
            </Flex>
            
        </Box>
        <Box height="10" order="1">
          <Flex gap="1">
            <Icon size="md">
              <img src="https://favicon.im/linkedin.com" alt="linkedin.com favicon" />
            </Icon>ADPList
          </Flex>
        </Box>
        <Box height="10" order="1">
          <Flex gap="1">
            <Icon size="md">
              <img src="https://favicon.im/adplist.org" alt="linkedin.com favicon" />
            </Icon>ADPList
          </Flex>
        </Box>
      </Flex>
    </footer>
  );
}

function createColorSprite(srcUrl) {
    var W, H;
    const img = new Image;
    img.src = srcUrl;
    const channels = [];
    img.addEventListener("load",() => {
        channels[0] = imageFilterChannel(img, "red");
        channels[1] = imageFilterChannel(img, "green");
        channels[2] = imageFilterChannel(img, "blue");
        channels[3] = imageFilterChannel(img, "alpha");
        API.ready = true;
    }, {once: true});

    const API = {
        ready: false,
        drawColored(ctx, x, y, scale, rot, color) { // color is CSS hex color #RRGGBBAA
                                                    // eg #FFFFFFFF
            // get RGBA from color string
            const r = parseInt(color[1] + color[2], 16);
            const g = parseInt(color[3] + color[4], 16);
            const b = parseInt(color[5] + color[6], 16);
            const a = parseInt(color[7] + color[8], 16);

            // Setup location and transformation
            const ax = Math.cos(rot) * scale;
            const ay = Math.sin(rot) * scale;
            ctx.setTransform(ax, ay, -ay, ax, x, y);
            const offX = -W / 2;
            const offY = -H / 2;

          
            // draw alpha first then RGB
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = a / 255;
            ctx.drawImage(channels[3], offX, offY, W, H);

            ctx.globalCompositeOperation = "lighter";

            ctx.globalAlpha = r / 255;
            ctx.drawImage(channels[0], offX, offY, W, H);
            ctx.globalAlpha = g / 255;
            ctx.drawImage(channels[1], offX, offY, W, H);
            ctx.globalAlpha = b / 255;
            ctx.drawImage(channels[2], offX, offY, W, H);
                  
            ctx.globalCompositeOperation = "source-over";
        }
    };
    return API;
}

function imageFilterChannel(img: HTMLImageElement, arg1: string): never {
  throw new Error("Function not implemented.");
}
