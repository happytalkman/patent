# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


3D 기구학 & FTO 시뮬레이터: RoboticArmCanvas.tsx, FtoSimulatorView.tsx
3D 공간 약도 & 실증 예약: IsometricMapCanvas.tsx, SpatialMapView.tsx
특허 공백기술 & 패밀리트리: WhiteSpaceView.tsx
특허 동향 & 지식 커뮤니티: PatentTrendsView.tsx, CommunityView.tsx
수파베이스 & 소셜 OAuth 인증: supabaseClient.ts, AuthContext.tsx, AuthModal.tsx
Cloudflare 배포 & GitHub Actions: wrangler.toml, .github/workflows/deploy.yml
단위 및 통합 테스트 스위트 (7개 파일): src/test/*.test.tsx (22개 테스트 통과)
