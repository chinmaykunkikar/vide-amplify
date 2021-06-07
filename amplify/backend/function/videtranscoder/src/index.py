import logging
import os
import subprocess
import urllib.parse
from pathlib import Path
from shutil import copyfile

# set up logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def run_command(command):
    command_list = command.split(" ")

    try:
        subprocess.run(command_list, stdout=subprocess.PIPE)
    except Exception as e:
        logger.error(f"Exception: {e}")
        return False
    return True

def handler(event, context):

    # configurations
    HOME_DIR = "/var/task/"
    TEMP_DIR = "/tmp/"
    TRANSCODER = "create-vod-hls.sh"
    DOWNLOAD_BUCKET = event["Records"][0]["s3"]["bucket"]["name"]
    UPLOAD_BUCKET = "vide103713-staging/public/output"
    OBJECT_KEY = urllib.parse.unquote_plus(
        event["Records"][0]["s3"]["object"]["key"], encoding="utf-8"
    )
    OBJECT_FILENAME = Path(OBJECT_KEY).name
    OBJECT_FILENAME_BASE = Path(OBJECT_KEY).stem
    USERNAME = Path(OBJECT_KEY).parts[-2]
    TEMP_FILE_LOCATION = f"{TEMP_DIR}{OBJECT_FILENAME}"
    PROCESSED_OUTPUT_LOCATION = f"{TEMP_DIR}{OBJECT_FILENAME_BASE}"
    RUN_TRANSCODER = f"{TEMP_DIR}{TRANSCODER} {TEMP_FILE_LOCATION} {PROCESSED_OUTPUT_LOCATION}"
    DOWNLOAD_S3_LAMBDA = f"/opt/aws s3 cp s3://{DOWNLOAD_BUCKET}/{OBJECT_KEY} {TEMP_DIR}"
    SYNC_LAMBDA_S3 = (
        f"/opt/aws s3 sync {PROCESSED_OUTPUT_LOCATION}/ s3://{UPLOAD_BUCKET}/{USERNAME}/{OBJECT_FILENAME_BASE}/ --acl public-read"
    )

    run_command(f"rm -rf {TEMP_DIR}*")

    # copy file to /tmp and add execute access (755)
    copyfile(f"{HOME_DIR}{TRANSCODER}", f"{TEMP_DIR}{TRANSCODER}")
    os.chmod(f"{TEMP_DIR}{TRANSCODER}", 0o755)

    # download file to lambda
    run_command(DOWNLOAD_S3_LAMBDA)

    # transcode file
    run_command(RUN_TRANSCODER)

    # upload transcoded output
    run_command(SYNC_LAMBDA_S3)

    logger.info("Successfully transcoded")

    return True