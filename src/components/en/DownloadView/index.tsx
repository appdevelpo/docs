import {useEffect, useState} from "react";
import {marked} from "marked";
import style from '@components/DownloadView/styles.module.css';

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
            // The GitHub API returns an array for the releases list endpoint.
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
            <h6>The latest stable version： {data.name ?? "loading..."}</h6>
            {error ? (
                <p className={style["error"]}>Failed to fetch release info: {error}</p>
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
                    <h6 className={style["new"]}>What's new in this version?</h6>
                    <div
                        className={style["markdown-body"]}
                        dangerouslySetInnerHTML={{__html: releaseNotes}}
                    ></div>
                </>
            )}
        </div>
    );
}
