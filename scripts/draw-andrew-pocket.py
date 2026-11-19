"""Render the original Andrew Pocket artwork. Run with Python and Pillow."""
from pathlib import Path
from random import Random

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "public/images/andrew-pocket"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#263934"
DARK = "#375648"
CREAM = "#f2dba4"
GOLD = "#eec37b"
WOOD = "#694938"
WOOD_MID = "#9e6f4b"
WOOD_LIGHT = "#c69661"
GLASS = "#396e77"
GLASS_LIGHT = "#80c2bb"
ROOFS = [
    ("#2e5053", "#477976", "#63a098", "#9ac1a7"),
    ("#413e54", "#65647f", "#85839c", "#aba6bd"),
    ("#674337", "#a26046", "#c98258", "#edab70"),
]
GRASS = ("#698b53", "#6d9056", "#73965a", "#7b9b5e")
FLOWERS = ("#e7ae6b", "#efcb86", "#d89b9f", "#efe3af")


def rect(d, coords, color):
    d.rectangle(coords, fill=color)


def line(d, coords, color, width=1):
    d.line(coords, fill=color, width=width)


def poly(d, coords, color):
    d.polygon(coords, fill=color)


def image(size, color=None):
    canvas = Image.new("RGB" if color else "RGBA", size, color or (0, 0, 0, 0))
    return canvas, ImageDraw.Draw(canvas)


def base_shadow(d, x, y, w, h=4, color="#557347"):
    poly(d, [(x + 3, y), (x + w - 5, y), (x + w, y + h - 2),
             (x + w - 4, y + h), (x, y + h), (x, y + 2)], color)


def tuft(d, x, y, color="#537c4c"):
    line(d, [(x, y - 2), (x + 2, y)], color)
    line(d, [(x + 2, y), (x + 3, y - 3)], color)
    rect(d, (x + 1, y + 1, x + 3, y + 1), "#86a366")


def blossom(d, x, y, color):
    line(d, [(x, y - 3), (x, y + 1), (x - 2, y + 2)], "#507145")
    rect(d, (x - 2, y - 4, x + 2, y - 3), color)
    rect(d, (x - 1, y - 5, x + 1, y - 2), color)
    d.point((x, y - 4), "#fff0b7")


def tree(d, x, y, seed, scale=1):
    """Tree anchor is its feet. All foliage uses upper-left lighting."""
    s = scale
    def points(vertices):
        return [(round(x + u * s), round(y + v * s)) for u, v in vertices]

    base_shadow(d, x - round(14*s), y - 1, round(29*s), 4)
    poly(d, points([(-4, 0), (-2, -9), (1, -21), (4, -21), (4, -8),
                    (6, 0), (3, 1), (0, -1)]), "#5a4734")
    line(d, points([(0, -13), (0, -6), (-2, -1)]), WOOD_LIGHT)
    canopy = [(-15,-15),(-15,-25),(-12,-25),(-12,-31),(-8,-31),(-8,-35),
              (-2,-35),(-2,-38),(6,-38),(6,-35),(12,-35),(12,-32),
              (16,-32),(16,-25),(19,-25),(19,-15),(15,-15),(15,-11),
              (9,-11),(9,-8),(-3,-8),(-3,-10),(-10,-10),(-10,-13),(-15,-13)]
    poly(d, points(canopy), "#345443")
    interior = [(int(u*.90), int((v+23)*.86-23)) for u,v in canopy]
    poly(d, points(interior), "#48754b")
    poly(d, points([(-13,-23),(-11,-29),(-7,-29),(-7,-33),(-1,-33),(-1,-35),
                    (7,-35),(7,-33),(11,-33),(11,-29),(14,-29),(14,-24),
                    (10,-24),(10,-20),(6,-20),(6,-22),(1,-22),(1,-18),
                    (-6,-18),(-6,-15),(-10,-15),(-10,-20),(-13,-20)]), "#678d4e")
    rng = Random(seed)
    for _ in range(26):
        u, v = rng.randrange(-11, 13), rng.randrange(-33, -12)
        px, py = points([(u,v)])[0]
        if d._image.getpixel((px,py))[:3] in ((103,141,78), (72,117,75)):
            line(d, [(px,py),(px+1,py)], rng.choice(["#779952","#527e4a","#5d874d","#87a45b"]))


def bush(d, x, y, tone=0):
    base_shadow(d, x-8, y-3, 18, 3)
    poly(d, [(x-8,y-2),(x-8,y-6),(x-6,y-6),(x-6,y-9),(x-2,y-9),
             (x-2,y-11),(x+3,y-11),(x+3,y-8),(x+7,y-8),(x+7,y-5),
             (x+9,y-5),(x+9,y-2),(x+5,y),(x-5,y)], "#3d6445")
    poly(d, [(x-6,y-3),(x-6,y-7),(x-2,y-7),(x-2,y-9),(x+2,y-9),
             (x+2,y-6),(x+6,y-6),(x+6,y-3)], "#638e50")
    for off, ah in [(-4,-5),(0,-7),(4,-4)]:
        rect(d, (x+off,y+ah,x+off+1,y+ah), FLOWERS[tone] if tone else "#84a75a")


def bench(d, x, y):
    base_shadow(d, x-2, y-1, 26, 3)
    rect(d, (x+2,y-10,x+3,y), WOOD)
    rect(d, (x+19,y-10,x+20,y), WOOD)
    rect(d, (x,y-13,x+22,y-7), WOOD)
    line(d, [(x+1,y-12),(x+21,y-12)], WOOD_LIGHT, 2)
    poly(d, [(x,y-6),(x+22,y-6),(x+24,y-3),(x+1,y-3)], WOOD_MID)
    line(d, [(x+1,y-5),(x+22,y-5)], GOLD)
    line(d, [(x+1,y-2),(x+24,y-2)], "#483a32")


def lantern(d, x, y):
    base_shadow(d, x-5, y-1, 15, 3)
    rect(d, (x-1,y-14,x+1,y), "#3e5146")
    line(d, [(x,y-12),(x,y-2)], "#778575")
    rect(d, (x-4,y-20,x+4,y-13), INK)
    rect(d, (x-3,y-19,x+3,y-15), "#e0a35e")
    rect(d, (x-2,y-19,x+1,y-16), "#f9d889")
    poly(d, [(x-5,y-20),(x-2,y-23),(x+2,y-23),(x+5,y-20)], INK)
    d.point((x-1,y-22), "#728373")


def fence(d, x, y, count):
    for i in range(count):
        px = x + i*9
        rect(d, (px,y-8,px+2,y+1), WOOD)
        line(d, [(px,y-8),(px+1,y-9),(px+2,y-8)], WOOD_LIGHT)
    rect(d, (x-2,y-6,x+(count-1)*9+4,y-5), WOOD_MID)
    rect(d, (x-2,y-3,x+(count-1)*9+4,y-2), "#aa8055")


def town(mobile=False):
    canvas, d = image((400,200), GRASS[1])
    rng = Random(816)
    # Meadow zones form soft-looking transitions using irregular pixel steps.
    for vertices, color in [
        ([(0,0),(399,0),(399,31),(382,31),(382,27),(332,24),(309,29),(290,25),
          (251,25),(245,16),(165,16),(145,30),(82,33),(66,46),(0,49)], "#5b7e49"),
        ([(0,123),(29,120),(40,128),(75,129),(88,141),(132,139),(151,147),
          (195,147),(191,169),(146,183),(95,182),(68,190),(0,197)], "#719557"),
        ([(243,53),(278,46),(348,49),(375,45),(399,53),(399,109),(367,108),
          (355,120),(309,117),(283,129),(243,119)], "#74975b"),
        ([(10,185),(92,180),(112,186),(140,184),(165,190),(228,186),(264,190),
          (304,180),(353,184),(399,175),(399,199),(0,199)], "#62864c"),
    ]:
        poly(d, vertices, color)
    for _ in range(2700):
        x,y = rng.randrange(400),rng.randrange(200)
        if rng.random() < .77:
            d.point((x,y), rng.choice(["#66894f","#759759","#7e9d5e","#6b8b51"]))
        else:
            line(d, [(x,y),(x+1,y)], rng.choice(["#77995b","#5f854c"]))
    for x,y in [(20,80),(37,54),(53,119),(62,103),(109,125),(119,92),
                (140,62),(157,125),(183,105),(221,108),(245,110),(264,94),
                (281,124),(342,121),(378,108),(387,135),(314,185),(131,185),(62,190)]:
        for _ in range(6):
            tuft(d,x+rng.randrange(-6,7),y+rng.randrange(-5,6))
    # The footprints and path junctions line up with the React door anchors.
    main = [(14,163),(37,162),(58,166),(101,166),(140,161),(181,162),(200,166),
            (220,164),(261,161),(302,167),(355,166),(389,160)]
    wings = [[(84,94),(84,114),(86,128),(91,145),(92,165)],
             [(200,81),(200,94),(197,112),(199,143),(200,180)],
             [(316,94),(315,115),(313,133),(307,149),(306,167)]]
    mask = Image.new("L",(400,200))
    md = ImageDraw.Draw(mask)
    def pathway(draw, points, width, fill):
        draw.line(points, fill=fill, width=width, joint="curve")
        for x,y in points:
            r = width//2
            draw.ellipse((x-r,y-r,x+r,y+r), fill=fill)
    for points in [main,*wings]:
        pathway(d, points, 23, "#577547")
        pathway(d, points, 20, "#ac8f5f")
        pathway(md, points, 17, 255)
    canvas.paste("#d9be88",(0,0,400,200),mask)
    for _ in range(2900):
        x,y = rng.randrange(400),rng.randrange(200)
        if mask.getpixel((x,y)):
            line(d, [(x,y),(x+1,y)],rng.choice(["#e9ce98","#c8ab77","#dec592","#cbb180"]))
    for x,y in [(84,94),(200,82),(316,94)]:
        rect(d,(x-12,y-6,x+12,y+6),"#a09172")
        for ix in range(4):
            stone=x-11+ix*6
            rect(d,(stone,y-5,stone+4,y-2),"#d9c695")
            rect(d,(stone,y,stone+4,y+3),"#cbb88c")
    if mobile:
        # Keep map anchors in the same place while rendering props at a phone-friendly aspect ratio.
        canvas = canvas.resize((244, 224), Image.Resampling.NEAREST)
        d = ImageDraw.Draw(canvas)

    def scenery(draw, x, y, *args):
        if not mobile:
            draw(d, x, y, *args)
            return
        tile, tile_draw = image((72, 60))
        draw(tile_draw, 23, 48, *args)
        tile = tile.resize((51, 43), Image.Resampling.NEAREST)
        canvas.paste(tile, (round(x * 244 / 400) - 16, round(y * 224 / 200) - 34), tile)

    for x,y in [(26,66),(46,48),(129,41),(156,52),(253,44),(280,46),
                (366,53),(385,74),(18,121),(116,116),(279,118),(369,126),
                (28,191),(169,197),(231,196),(374,193)]:
        scenery(tree,x,y,x+y,.66 if y>=190 else .82)
    for x,y,i in [(54,76,0),(115,87,1),(166,82,3),(225,77,0),(286,90,2),
                    (342,89,1),(18,144,0),(118,148,0),(151,141,2),(244,142,1),
                    (280,152,0),(367,149,0),(93,190,2),(323,194,3),(399,173,1)]:
        scenery(bush,x,y,i)
    for x,y in [(44,151),(129,151),(246,149),(333,153)]:
        scenery(bench,x,y)
    for x,y in [(69,127),(105,132),(183,129),(215,114),(292,135),(331,131),
                (14,168),(387,169)]:
        scenery(lantern,x,y)
    for x,y,n in [(3,105,4),(130,96,4),(232,99,3),(354,108,4),(45,186,4),(332,187,3)]:
        scenery(fence,x,y,n)
    for x,y in [(38,91),(56,111),(115,132),(142,112),(181,150),(222,150),
                (273,110),(352,111),(68,182),(122,189),(254,186),(347,179)]:
        for i in range(5):
            scenery(blossom,x+rng.randrange(-5,6),y+rng.randrange(-3,6),FLOWERS[i%4])
    canvas.save(OUT/("town-phone.png" if mobile else "town.png"), optimize=True)


def window(d, x, y, w=16, h=16, light=GLASS_LIGHT):
    rect(d,(x-2,y-2,x+w+1,y+h+1),INK)
    rect(d,(x-1,y-1,x+w,y+h),WOOD_MID)
    rect(d,(x,y,x+w-1,y+h-1),GLASS)
    poly(d, [(x+1,y+1),(x+w-3,y+1),(x+2,y+h-3),(x+1,y+h-3)], light)
    line(d,[(x+int(w*.52),y),(x+int(w*.52),y+h-1)],CREAM,1)
    line(d,[(x,y+int(h*.55)),(x+w-1,y+int(h*.55))],CREAM,1)
    rect(d,(x-2,y+h,x+w+1,y+h+2),WOOD)
    line(d,[(x-1,y+h),(x+w,y+h)],GOLD)


def facade(district, door_frame):
    canvas, d = image((112,73))
    roof_dark, roof, roof_light, roof_rim = ROOFS[district]
    poly(d,[(8,63),(92,59),(108,67),(107,71),(20,71),(4,68)],(32,55,42,110))
    poly(d,[(13,42),(93,42),(102,35),(102,61),(95,67),(13,67)], INK)
    rect(d,(15,38,93,64),"#e0bf85")
    poly(d,[(94,37),(100,32),(100,60),(94,64)],"#a6825d")
    rect(d,(16,43,92,46),"#b58b5c")
    for y in range(48,62,4):
        for x in range(17+(y%3)*4,92,13):
            line(d,[(x,y),(x+5,y)],"#bb9b68")
    rect(d,(15,60,93,64),"#8b7760")
    rect(d,(16,60,93,61),"#beab80")
    for x in range(17,94,8):
        rect(d,(x,63,x+5,64),"#6e6959")
    for x in (15,38,72,91):
        rect(d,(x,38,x+2,63),WOOD)
        line(d,[(x,y) for y in (43,61)],WOOD_LIGHT)
    # Tiled front pitch and shaded side pitch.
    poly(d,[(7,39),(9,34),(29,13),(82,13),(104,32),(105,38),(97,43),(8,43)],INK)
    poly(d,[(10,36),(30,15),(81,15),(98,36)],roof)
    poly(d,[(82,15),(102,33),(102,37),(98,40),(96,34)],roof_dark)
    roof_mask = Image.new("1",canvas.size)
    ImageDraw.Draw(roof_mask).polygon([(10,36),(30,15),(81,15),(98,36)],fill=1)
    for y in range(17,38,4):
        for x in range(9,100):
            if roof_mask.getpixel((x,y)):
                d.point((x,y),roof_dark)
                if (x + y//4*3) % 8 == 0:
                    line(d,[(x,y+1),(x,y+2)],roof_dark)
                elif (x + y//4*3) % 8 in (1,2,3):
                    d.point((x,y+1),roof_light)
    poly(d,[(7,36),(98,36),(104,32),(104,38),(98,42),(7,42)],roof_dark)
    line(d,[(8,37),(97,37),(102,34)],roof_rim,2)
    line(d,[(30,14),(80,14)],roof_rim,2)
    line(d,[(45,13),(65,13)],CREAM)
    if district==1:
        line(d,[(73,13),(73,1)],INK,2)
        line(d,[(68,4),(80,4)],"#aab1ac",2)
        line(d,[(67,8),(77,8)],"#7d8a8b")
        d.point((73,0),"#f4ae79")
        line(d,[(95,24),(96,44),(99,51),(99,59)],INK)
    elif district==0:
        rect(d,(67,8,74,19),INK)
        rect(d,(68,8,72,18),"#9a684c")
        rect(d,(66,6,75,8),"#d39366")
    else:
        rect(d,(62,5,73,14),WOOD)
        rect(d,(63,5,72,10),"#daa26a")
        line(d,[(63,8),(71,8)],"#8c543e")
    # A shared facade and three readable district emblems.
    rect(d,(43,30,68,38),INK)
    rect(d,(44,31,67,36),roof_dark)
    line(d,[(45,31),(66,31)],roof_rim)
    if district==0:
        rect(d,(51,32,60,35),"#aad8c5")
        d.point((54,34),GLASS)
        d.point((57,34),GLASS)
    elif district==1:
        line(d,[(49,34),(61,34)],"#bec9ea")
        rect(d,(54,32,57,36),"#bec9ea")
    else:
        poly(d,[(55,31),(60,34),(55,37),(50,34)],"#ffd193")
    window(d,21,47,13,10, "#80c2bb" if district!=2 else "#d5ad76")
    window(d,77,47,11,10, "#9eb7cd" if district==1 else "#80c2bb")
    if district==0:
        for x,y in [(17,65),(93,66)]:
            for i in range(4):
                rect(d,(x+i,y-4-i%2,x+i,y-1),"#54784e")
            rect(d,(x-1,y-1,x+5,y+2),WOOD_MID)
    elif district==1:
        rect(d,(78,57,88,61),INK)
        for x in (79,82,86):
            d.point((x,59),"#92e0a7")
        rect(d,(16,59,23,65),"#69657f")
        line(d,[(17,61),(21,61)],"#a4a6ac")
    else:
        for x,y in [(17,62),(83,59),(90,62)]:
            rect(d,(x,y,x+6,y+5),WOOD)
            rect(d,(x+1,y,x+5,y+3),GOLD)
            line(d,[(x+3,y),(x+3,y+3)],"#b47851")
    rect(d,(44,43,67,65),WOOD)
    rect(d,(46,44,65,65),INK)
    rect(d,(47,45,64,65),"#223c3d")
    if door_frame==0:
        rect(d,(47,45,64,65),roof_dark)
        rect(d,(48,46,63,57),roof)
        rect(d,(50,47,61,54),GLASS)
        line(d,[(51,48),(60,48)],GLASS_LIGHT)
        line(d,[(55,47),(55,54)],CREAM)
        line(d,[(50,61),(61,61)],roof_light)
        d.point((61,59),GOLD)
    else:
        last = 54 if door_frame==1 else 49
        poly(d,[(47,45),(last,46),(last,65),(47,65)],roof)
        line(d,[(last,46),(last,64)],roof_light)
        rect(d,(max(last+1,52),62,64,65),GOLD)
    rect(d,(42,65,69,67),"#84755b")
    line(d,[(43,65),(68,65)],CREAM)
    line(d,[(44,67),(67,67)],"#b7a078")
    return canvas


def pot(d,x,y):
    base_shadow(d,x-6,y,13,3,"#ad8b64")
    poly(d,[(x-5,y-6),(x+5,y-6),(x+3,y+2),(x-3,y+2)],WOOD)
    rect(d,(x-4,y-5,x+3,y-2),"#ba7757")
    line(d,[(x,y-6),(x,y-14)],"#52794d",2)
    poly(d,[(x,y-8),(x-6,y-8),(x-7,y-14),(x-2,y-13)],"#50784b")
    poly(d,[(x,y-10),(x+5,y-15),(x+7,y-16),(x+7,y-12),(x+3,y-9)],"#79a25a")


def interior(district):
    roof_dark, roof, roof_light, roof_rim = ROOFS[district]
    rng = Random(110 + district)
    canvas,d=image((400,200),"#c4a479")
    rect(d,(0,0,399,79),roof)
    for y in range(4,74,8):
        line(d,[(0,y),(399,y)],roof_dark)
        line(d,[(0,y+1),(399,y+1)],roof_light)
        for x in range(y%3*21,399,49):
            line(d,[(x,y+2),(x,y+7)],roof_dark)
    rect(d,(0,68,399,71),roof_dark)
    rect(d,(0,72,399,73),roof_rim)
    rect(d,(0,74,399,80),WOOD)
    line(d,[(0,75),(399,75)],WOOD_LIGHT)
    strip=("#cca97e","#d1b78d","#d8bd91","#c6a278")
    for row,y in enumerate(range(81,200,8)):
        for x in range(-48+(row*21)%48,400,48):
            rect(d,(x,y,x+46,y+6),strip[rng.randint(0,3)])
            line(d,[(x,y),(x+46,y)],"#e0c497")
            for _ in range(3):
                start=rng.randrange(x+1,x+37)
                gy=y+rng.randrange(2,6)
                line(d,[(start,gy),(start+rng.randrange(2,8),gy)],"#bea077")
        line(d,[(0,y+7),(399,y+7)],"#ab8a63")
    for x in (30,340):
        window(d,x,36,29,24, "#99c7c0" if district!=1 else "#adbcd4")
        rect(d,(x-2,63,x+31,65),roof_dark)
        rect(d,(x,62,x+29,62),ROOFS[district][3])
    for x in (117,247):
        rect(d,(x,40,x+29,61),roof_dark)
        rect(d,(x+1,41,x+28,60),CREAM)
        rect(d,(x+3,43,x+26,57),"#f0daa8")
        for i in range(3):
            line(d,[(x+7,46+i*3),(x+21-(i%2)*4,46+i*3)],roof_light)
    rect(d,(174,58,226,62),WOOD)
    line(d,[(175,58),(225,58)],WOOD_LIGHT)
    for i in range(8):
        x=177+i*6
        h=rng.randrange(6,13)
        rect(d,(x,57-h,x+3,57),rng.choice([roof_dark,CREAM,"#bb795f",roof_light]))
        line(d,[(x+1,58-h),(x+1,55)],"#d7b881")
    # Each rug shares a border and weave, with its district's color as the field.
    base_shadow(d,88,120,230,48,"#ad8d68")
    poly(d,[(92,117),(308,117),(318,125),(318,163),(309,171),
            (91,171),(82,163),(82,125)],roof_dark)
    poly(d,[(93,120),(307,120),(315,127),(315,161),(308,168),
            (92,168),(85,161),(85,127)],CREAM)
    poly(d,[(95,123),(305,123),(312,129),(312,159),(306,165),
            (94,165),(88,159),(88,129)],roof)
    for y in range(127,165,3):
        for x in range(92+(y%2)*2,309,5):
            d.point((x,y),roof_light)
    for x in (109,291):
        poly(d,[(x,134),(x+12,143),(x,152),(x-12,143)],roof_dark)
        poly(d,[(x,137),(x+8,143),(x,149),(x-8,143)],roof_rim)
    line(d,[(130,144),(270,144)],roof_rim)
    rect(d,(191,178,209,185),WOOD_MID)
    line(d,[(191,178),(209,178)],GOLD)
    for x in (23,377):
        pot(d,x,114)
        pot(d,x+(5 if x<100 else -5),163)
    for x in (0,397):
        rect(d,(x,0,x+2,199),roof_dark)
    canvas.save(OUT/f"room-{district}.png",optimize=True)


def desk(d, x=9, y=44, w=56, hue=WOOD_MID):
    base_shadow(d,x-4,y+9,w+12,4,(44,47,39,96))
    rect(d,(x+2,y+3,x+5,y+12),INK)
    rect(d,(x+w-6,y+3,x+w-3,y+12),INK)
    rect(d,(x,y,x+w,y+9),WOOD)
    rect(d,(x+1,y+1,x+w-1,y+6),hue)
    poly(d,[(x-1,y),(x+4,y-5),(x+w-4,y-5),(x+w+1,y)],WOOD_LIGHT)
    line(d,[(x,y),(x+w,y)],GOLD)
    line(d,[(x+9,y+5),(x+w-12,y+5)],WOOD)


def crt(d,x,y,mode):
    rect(d,(x+6,y+19,x+19,y+23),INK)
    poly(d,[(x,y+4),(x+4,y),(x+24,y),(x+28,y+4),(x+28,y+20),(x,y+20)],INK)
    rect(d,(x+2,y+3,x+26,y+17),"#74867b")
    rect(d,(x+4,y+4,x+24,y+15),"#2d635e")
    rect(d,(x+5,y+5,x+23,y+13),"#6eaaa1")
    line(d,[(x+6,y+6),(x+22,y+6)],"#b9d6b7")
    if mode=="grid":
        for v in range(8,23,5):
            line(d,[(x+v,y+9),(x+v,y+13)],"#477d76")
    else:
        for i in range(3):
            line(d,[(x+7,y+8+i*2),(x+20-i*3,y+8+i*2)],"#cfdebc")
    d.point((x+24,y+18),"#b5d98e")


def carton(d,x,y,w=9,h=10,color="#d89866"):
    poly(d,[(x,y+2),(x+3,y),(x+w,y),(x+w,y+h-1),(x+w-3,y+h+2),(x,y+h+2)],WOOD)
    rect(d,(x+1,y+3,x+w-3,y+h),color)
    line(d,[(x+2,y+2),(x+w-2,y+2)],GOLD)
    line(d,[(x+w-2,y+3),(x+w-2,y+h-1)],WOOD_MID)
    if w>6:
        line(d,[(x+3,y+5),(x+3,y+7)],CREAM)


def station(name, pulse=0):
    canvas,d=image((72,58))
    if name=="counter":
        desk(d,6,43,60,"#668c80")
        crt(d,16,18,"grid")
        carton(d,51,30,8,8,"#ebd197")
        rect(d,(48,42,58,43),"#eee2b6")
        rect(d,(12,46,29,49),"#375952")
        line(d,[(14,47),(26,47)],"#abbb92")
    elif name=="pads":
        desk(d,8,43,56,"#b09371")
        rect(d,(15,21,55,40),INK)
        rect(d,(17,23,53,38),"#859697")
        for x,y in [(20,27),(32,27),(39,32)]:
            rect(d,(x,y,x+13,y+9),"#bfaf89")
            rect(d,(x,y,x+12,y+6),"#f5e5b7")
            line(d,[(x+2,y+2),(x+8,y+2)],"#849a92")
            line(d,[(x+2,y+4),(x+10,y+4)],"#adbdad")
        rect(d,(11,41,60,42),"#a6b09f")
        rect(d,(30,46,43,48),INK)
        line(d,[(32,47),(41,47)],GOLD)
    elif name=="directory":
        desk(d,7,43,57,"#658989")
        crt(d,12,17,"list")
        for x,y,c in [(43,34,"#aaa2b4"),(49,27,"#bd9469"),(54,22,"#75a098")]:
            rect(d,(x,y,x+4,42),INK)
            rect(d,(x+1,y+1,x+3,40),c)
            d.point((x+2,y+4),CREAM)
        rect(d,(13,46,59,49),"#43645e")
        for x in (21,36,51):
            line(d,[(x,47),(x+3,47)],GOLD)
    elif name=="rack":
        base_shadow(d,14,51,47,4,(32,46,37,118))
        poly(d,[(17,9),(22,4),(51,4),(57,10),(57,49),(51,54),(17,54)],INK)
        rect(d,(19,11,49,51),"#5a6371")
        poly(d,[(19,10),(23,6),(50,6),(54,10)],"#888594")
        poly(d,[(51,12),(55,9),(55,48),(51,51)],"#424858")
        for i,y in enumerate(range(13,48,8)):
            rect(d,(22,y,47,y+5),"#293942")
            line(d,[(23,y+1),(44,y+1)],"#4d6170")
            for x in (24,27,30):
                color="#b0d798" if (x+i+pulse)%3 else "#77aa83"
                d.point((x,y+3),color)
            rect(d,(39,y+3,44,y+3),"#848f99")
        line(d,[(54,22),(61,27),(61,44),(58,50)],"#926852")
        line(d,[(55,31),(58,35),(58,46)],"#b3a077")
    elif name=="automation":
        desk(d,5,43,60,"#71758f")
        crt(d,9,17,"grid")
        rect(d,(40,27,61,39),INK)
        rect(d,(41,27,60,36),"#8c899a")
        rect(d,(43,29,57,34),"#f1dda9")
        line(d,[(45,31),(55,31)],"#a0918d")
        for x in (43,48,53,58):
            d.point((x,37),"#dea96d" if x==43+pulse*5 else "#b5d1a4")
        rect(d,(25,41,56,43),"#bab1a0")
    elif name=="model":
        desk(d,4,43,62,"#688a69")
        poly(d,[(8,37),(17,29),(61,29),(67,38),(59,44),(9,44)],INK)
        poly(d,[(10,36),(18,30),(59,30),(64,38),(59,42),(11,42)],"#669252")
        line(d,[(14,38),(33,36),(56,39)],"#d9c792",3)
        for x,y,c in [(16,30,"#608e83"),(32,24,"#8886a0"),(48,32,"#c89067"),(39,36,"#78a691")]:
            rect(d,(x,y-3,x+7,y+4),CREAM)
            poly(d,[(x-1,y-3),(x+2,y-6),(x+6,y-6),(x+9,y-3)],c)
            d.point((x+4,y+1),INK)
        for x,y in [(12,40),(25,34),(58,32),(61,41)]:
            rect(d,(x,y-5,x+1,y-1),"#305f4e")
            d.point((x,y-5),"#a4bc72")
    elif name=="bench":
        desk(d,5,44,61,"#b4855f")
        rect(d,(10,18,61,39),WOOD)
        rect(d,(11,19,60,37),"#c6a57b")
        for x in range(13,60,4):
            for y in range(21,36,4):
                d.point((x,y),"#9c805f")
        line(d,[(15,25),(15,32),(19,34)],"#617b77",2)
        line(d,[(25,23),(28,31)],"#4f6e68",2)
        rect(d,(44,25,59,35),"#f1d9a9")
        line(d,[(46,27),(54,27)],"#b08661")
        carton(d,34,36,9,7,"#dc9f74")
        carton(d,50,33,9,9,"#68948c")
        rect(d,(11,41,28,43),"#e6d7af")
    else:
        base_shadow(d,15,51,46,4,(32,46,37,118))
        poly(d,[(17,9),(23,5),(49,5),(56,10),(56,48),(51,53),(17,53)],INK)
        rect(d,(19,11,49,51),"#886f93")
        poly(d,[(50,11),(55,9),(55,47),(50,51)],"#584d71")
        rect(d,(21,11,47,18),"#d09a75")
        rect(d,(25,13,44,15),"#f7d38a")
        rect(d,(21,21,47,37),INK)
        rect(d,(23,23,45,35),"#487f78")
        poly(d,[(25,34),(30,28),(37,28),(39,26),(43,30),(43,34)],"#89ac78")
        rect(d,(31+pulse*3,28,33+pulse*3,30),"#f4d890")
        rect(d,(20,39,48,42),"#e6af78")
        rect(d,(27,36,28,39),INK)
        rect(d,(24,35,29,36),"#bd6d57")
        rect(d,(39,39,41,40),"#8f625b")
        rect(d,(29,46,37,48),"#594f6d")
    return canvas


def sprite(direction, frame):
    """Centered head, weighted coat and opposing leg and arm contact."""
    canvas,d=image((24,32))
    phase=(0,1,0,-1,0)[frame]
    step=1 if frame in (1,3) else 0
    bob=1 if frame in (2,4) else 0
    hair="#352f30"
    teal="#427f78"
    light="#69a497"
    shade="#345c59"
    skin="#e5ab78"
    face_high="#f3c38a"
    pants="#4a515b"
    shoes="#322f34"
    # Ground shadow must stay anchored when the body moves.
    poly(d,[(5,28),(17,28),(21,29),(21,30),(17,31),(5,31),(2,30),(2,29)],
         (33,48,36,95))
    for x,dy in [(7,phase),(13,-phase)]:
        rect(d,(x,22,x+3,27+dy),INK)
        rect(d,(x+1,23,x+3,26+dy),pants)
        rect(d,(x,26+dy,x+4,28+dy),shoes)
        line(d,[(x+1,27+dy),(x+3,27+dy)],"#aa8d72")
    cy=15+bob
    poly(d,[(6,cy),(9,cy-2),(15,cy-2),(18,cy),(19,cy+7),
            (16,cy+9),(8,cy+9),(5,cy+7)],INK)
    rect(d,(7,cy,16,cy+7),teal)
    rect(d,(8,cy,15,cy+1),light)
    line(d,[(8,cy+2),(8,cy+6)],light)
    rect(d,(7,cy+7,16,cy+8),shade)
    for x,dy in [(4,-phase),(17,phase)]:
        rect(d,(x,cy+2+dy,x+2,cy+6+dy),shade)
        rect(d,(x,cy+5+dy,x+2,cy+6+dy),skin)
    if direction=="up":
        rect(d,(8,cy+2,15,cy+7),WOOD)
        rect(d,(9,cy+2,14,cy+6),"#cd9b65")
        line(d,[(9,cy+3),(14,cy+3)],CREAM)
        rect(d,(11,cy+4,12,cy+5),"#6b6252")
    else:
        line(d,[(12,cy+1),(12,cy+7)],shade)
        line(d,[(13,cy+2),(14,cy+2)],GOLD)
    hy=3+bob
    poly(d,[(8,hy),(16,hy),(16,hy+1),(19,hy+1),(19,hy+8),(17,hy+8),
            (16,hy+11),(8,hy+11),(7,hy+8),(5,hy+8),(5,hy+2),(8,hy+2)],hair)
    if direction!="up":
        poly(d,[(8,hy+3),(16,hy+3),(16,hy+6),(18,hy+6),(17,hy+9),
                (15,hy+11),(9,hy+11),(7,hy+8),(7,hy+5)],skin)
        rect(d,(8,hy+5,15,hy+8),face_high)
        rect(d,(6,hy+2,17,hy+4),hair)
        rect(d,(6,hy+4,8,hy+5),hair)
        line(d,[(9,hy+2),(15,hy+2)],"#715142")
        if direction=="down":
            for x in (9,14):
                d.point((x,hy+6),INK)
            d.point((12,hy+9),"#aa695b")
        else:
            rect(d,(15,hy+6,16,hy+6),INK)
            rect(d,(17,hy+8,18,hy+8),skin)
            rect(d,(8,hy+6,9,hy+8),skin)
    else:
        rect(d,(7,hy+3,17,hy+8),hair)
        line(d,[(8,hy+2),(16,hy+2)],"#705043")
        line(d,[(8,hy+4),(13,hy+4)],"#5c443c")
        rect(d,(9,hy+9,15,hy+10),skin)
    if direction in ("left","right"):
        # The side stride swings shoes forward and back along the same baseline.
        if step:
            rect(d,(4,25,19,28),(0,0,0,0))
            rect(d,(6+phase*2,25,10+phase*2,27),pants)
            rect(d,(13-phase*2,25,17-phase*2,27),pants)
            line(d,[(6+phase*2,28),(10+phase*2,28)],shoes)
            line(d,[(13-phase*2,28),(17-phase*2,28)],shoes)
        if direction=="left":
            canvas=canvas.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    return canvas


if __name__=="__main__":
    town()
    town(mobile=True)
    for district in range(3):
        interior(district)
        atlas=Image.new("RGBA",(336,73))
        for frame in range(3):
            atlas.paste(facade(district,frame),(112*frame,0))
        atlas.save(OUT/f"district-{district}.png",optimize=True)
    for kind in ("counter","pads","directory","rack","automation","model","bench","arcade"):
        frames=3 if kind in ("rack","automation","arcade") else 1
        atlas=Image.new("RGBA",(72*frames,58))
        for frame in range(frames):
            atlas.paste(station(kind,frame),(frame*72,0))
        atlas.save(OUT/f"station-{kind}.png",optimize=True)
    atlas=Image.new("RGBA",(120,128))
    for row,direction in enumerate(("down","left","right","up")):
        for frame in range(5):
            atlas.paste(sprite(direction,frame),(24*frame,32*row))
    atlas.save(OUT/"andrew.png",optimize=True)
