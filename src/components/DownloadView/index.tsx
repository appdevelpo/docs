import { useEffect, useState } from "react";
import style from "./styles.module.css";
import { marked } from "marked";

export default function DownloadView() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>({});
  const [releaseNotes, setReleaseNotes] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function getLatestVersion() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/miru-project/miru-alpha/releases?per_page=1",
      );
      if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
      const json = await res.json();
      // The releases list endpoint returns an array; take the newest entry.
      const release = Array.isArray(json) ? json[0] : json;
      if (!release) throw new Error("No releases found");
      setData(release);
      // marked.parse is async (returns a Promise) in marked v18+
      setReleaseNotes(await marked.parse(release.body ?? ""));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLatestVersion();
  }, []);

  return (
    <div className={style["download-view"]}>
      <h6>目前最新稳定版本： {data.name ?? "loading..."}</h6>
      {error ? (
        <p className={style["error"]}>无法获取版本信息： {error}</p>
      ) : isLoading ? null : (
        <>
          <div className={style["button-container"]}>
            {data.assets.map((asset: any) => (
              <a
                className={style["button"]}
                href={asset.browser_download_url}
                target="_blank"
              >
                {asset.name}
              </a>
            ))}
          </div>
          <h6 className={style["new"]}>这个版本更新了什么 ?</h6>
          <div
            className={style["markdown-body"]}
            dangerouslySetInnerHTML={{ __html: releaseNotes }}
          ></div>
        </>
      )}
    </div>
  );
}
