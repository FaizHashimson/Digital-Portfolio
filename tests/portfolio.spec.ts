import { expect, test } from "@playwright/test";

const sections = [
  "home",
  "about",
  "work",
  "barbershop",
  "fzl-kitchen",
  "norisah-selera",
  "experience",
  "education",
  "contact",
];

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`all nine sections fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator("main > section")
        .evaluateAll((nodes) => nodes.map((node) => node.id)),
    ).toEqual(sections);
    const overflow = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return Array.from(
        document.querySelectorAll<HTMLElement>(
          "main h1, main h2, main h3, main p, main li, main figure, main a, .tools dd",
        ),
      ).flatMap((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width &&
          (rect.right > width + 1 ||
            rect.left < -1 ||
            node.scrollWidth > node.clientWidth + 2)
          ? [
              `${node.tagName}.${node.className}: ${node.textContent?.trim().slice(0, 70)}`,
            ]
          : [];
      });
    });
    expect(overflow).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    // Main grid columns must never collide, even as headings and body copy wrap.
    const collisions = await page
      .locator(
        ".hero-grid, .about-grid, .project-grid, .experience-grid, .education-grid, .contact-grid",
      )
      .evaluateAll((grids) =>
        grids.flatMap((grid) => {
          const [first, second] = Array.from(grid.children).map((child) =>
            child.getBoundingClientRect(),
          );
          return first &&
            second &&
            first.right > second.left + 1 &&
            first.bottom > second.top + 1 &&
            second.bottom > first.top + 1
            ? [grid.className]
            : [];
        }),
      );
    expect(collisions).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
  });
}

test("navigation follows every section and work links scroll to their project", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const id of sections) {
    await page.locator(`#${id}`).evaluate((node) => node.scrollIntoView());
    const expected = ["barbershop", "fzl-kitchen", "norisah-selera"].includes(
      id,
    )
      ? "work"
      : id;
    await expect(
      page.locator('.main-navigation [aria-current="location"]'),
    ).toHaveAttribute("href", `#${expected}`);
  }
  await page.getByRole("link", { name: "back to top" }).click();
  await expect(page.locator(".main-navigation [aria-current]")).toHaveText(
    "home",
  );
  await page.getByRole("link", { name: "see my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  for (const id of sections.slice(3, 6)) {
    await page.locator(`.work-link[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    const heading = await page.locator(`#${id} h2`).boundingBox();
    const header = await page.locator(".site-header").boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(header!.height);
  }
});

test("mobile menu supports touch, Escape and anchor selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('.main-navigation a[href="#education"]').click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#education$/);
  await expect(page.locator(".main-navigation [aria-current]")).toHaveText(
    "education",
  );
});

test("contact, project links and empty image frames are valid", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.locator('a[href="mailto:faizhashim61@gmail.com"]'),
  ).toHaveCount(2);
  await expect(
    page.locator(
      'address a[href="https://www.linkedin.com/in/faiz-hashim-814055216/"]',
    ),
  ).toBeAttached();
  await expect(
    page.locator('.project .button-link[target="_blank"]'),
  ).toHaveCount(3);
  await expect(page.locator(".placeholder-label")).toHaveCount(0);
  await expect(page.locator("main img")).toHaveCount(5);
  await expect(page.locator(".about-illustration img")).toHaveAttribute(
    "src",
    /faiz-about-illustration/,
  );
  await expect(
    page.locator(".hero-portrait .dark-line-portrait img"),
  ).toHaveAttribute("src", /faiz-dark-line-portrait/);
  await expect(page.locator(".contact-portrait")).toHaveCount(0);
  await expect(page.locator('link[rel="icon"][href^="/icon"]')).toHaveCount(1);
  await expect(
    page.locator("#barbershop .image-frame--project img"),
  ).toHaveAttribute("src", /barbershop-system/);
  await expect(
    page.locator("#barbershop .project-frame--barbershop"),
  ).toBeAttached();
  await expect(
    page.locator("#fzl-kitchen .image-frame--project img"),
  ).toHaveAttribute("src", /fzl-kitchen/);
  await expect(
    page.locator("#fzl-kitchen .project-frame--fzl-kitchen"),
  ).toBeAttached();
  await expect(
    page.locator("#norisah-selera .image-frame--project img"),
  ).toHaveAttribute("src", /norisah-selera-desa/);
  await expect(
    page.locator("#norisah-selera .project-frame--norisah-selera"),
  ).toBeAttached();
  expect(
    await page
      .locator("a")
      .evaluateAll(
        (links) =>
          links.filter(
            (link) =>
              !link.getAttribute("href") || link.getAttribute("href") === "#",
          ).length,
      ),
  ).toBe(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("200% text enlargement stays within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(1280);
});

test("Home and About portraits have no decorative arrows on mobile or tablet", async ({
  page,
}) => {
  for (const width of [390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".hero-portrait .portrait-arrow")).toHaveCount(0);
    await expect(page.locator(".about-portrait .portrait-arrow")).toHaveCount(
      0,
    );
    for (const portrait of ["hero", "about"]) {
      const wrapper = await page.locator(`.${portrait}-portrait`).boundingBox();
      const frame = await page
        .locator(`.${portrait}-portrait .image-frame`)
        .boundingBox();
      expect(Math.abs(wrapper!.width - frame!.width)).toBeLessThanOrEqual(1);
    }
  }
});

test("Work numbers leave space before their divider on mobile and tablet", async ({
  page,
}) => {
  for (const width of [390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const padding = await page
      .locator(".work-number")
      .first()
      .evaluate((element) => getComputedStyle(element).paddingRight);
    expect(parseFloat(padding)).toBeGreaterThan(0);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const desktopPadding = await page
    .locator(".work-number")
    .first()
    .evaluate((element) => getComputedStyle(element).paddingRight);
  expect(parseFloat(desktopPadding)).toBe(0);
});

test("Norisah Selera Desa keeps its desktop title hierarchy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#norisah-selera h2")).toHaveAttribute(
    "aria-label",
    "03 / Norisah Selera Desa",
  );
  const desktopBasis = await page
    .locator(".norisah-heading-rest")
    .evaluate((element) => getComputedStyle(element).flexBasis);
  expect(desktopBasis).toBe("100%");

  await page.setViewportSize({ width: 768, height: 900 });
  const tabletBasis = await page
    .locator(".norisah-heading-rest")
    .evaluate((element) => getComputedStyle(element).flexBasis);
  expect(tabletBasis).toBe("auto");
});

test("contact footer uses the reference arrangement on mobile and tablet", async ({
  page,
}) => {
  for (const width of [390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const columns = await page
      .locator(".contact-grid")
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    expect(columns.trim().split(/\s+/)).toHaveLength(1);

    const heading = await page.locator(".contact-heading").boundingBox();
    const details = await page.locator(".contact-details").boundingBox();
    expect(details!.y).toBeGreaterThan(heading!.y + heading!.height);

    const detailDisplay = await page
      .locator(".contact-details")
      .evaluate((element) => getComputedStyle(element).display);
    expect(detailDisplay).toBe("flex");
    const address = await page
      .locator(".contact-details address")
      .boundingBox();
    const emailButton = await page
      .locator(".contact-details .button-link")
      .boundingBox();
    expect(emailButton!.y).toBeGreaterThan(address!.y + address!.height);
    expect(emailButton!.width).toBeCloseTo(details!.width, 0);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const desktopColumns = await page
    .locator(".contact-grid")
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(desktopColumns.trim().split(/\s+/)).toHaveLength(2);
});
